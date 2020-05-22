const { DataSource } = require('apollo-datasource');
const Knex = require('knex');

class GeneralAPI extends DataSource {
    constructor({ db }) {
        super();
        this.db = db;
        this.knexDb = Knex({ 
            client: "mysql", 
            connection: {
                host: 'localhost',
                user: 'root',
                password: '',
                database: 'chris_pcs'
            }
        });
    }

    initialize(config) {
        this.context = config.context;
    }

    async generalGet({ rootSchema, rootTable, rootWhereColumn, rootWhereValue, info }) {
        const query = info.fieldNodes.find(field => field.name.value === info.fieldName);
        const type = info.schema.getType(rootSchema).astNode;
        const sql = this.knexDb.from(rootTable).where({ [rootWhereColumn]:rootWhereValue }).first();
        
        for (const field of query.selectionSet.selections
            .filter(field => !this.getDirective(type, field, 'toOne') && !this.getDirective(type, field, 'toMany'))
        ) {
            sql.select(field.name.value);
        }

        // Ensure we fetch the leftCol value for all toMany relationships to use for the subqueries
        for (const field of query.selectionSet.selections
            .filter(field => this.getDirective(type, field, 'toMany'))
        ) {
            const directive = this.getDirective(type, field, 'toMany');
            const leftCol = directive.arguments.find(arg => arg.name.value==="leftCol").value.value;
            sql.select(leftCol);
        }

        for (const field of query.selectionSet.selections
            .filter(field => this.getDirective(type, field, 'toOne'))
        ) {
            const directive = this.getDirective(type, field, 'toOne');
            const table = directive.arguments.find(arg => arg.name.value==="table").value.value;
            const leftCol = directive.arguments.find(arg => arg.name.value==="leftCol").value.value;
            const rightCol = directive.arguments.find(arg => arg.name.value==="rightCol").value.value;
            sql.leftJoin(table, leftCol, rightCol);
            for (const innerField of field.selectionSet.selections) {
                sql.select(innerField.name.value);
            }
        }

        const partialResult = await sql;

        // Turn the flat row of results into a JSON tree
        for (const field of query.selectionSet.selections
            .filter(field => this.getDirective(type, field, 'toOne'))
        ) {
            partialResult[field.name.value] = {};
            for (const innerField of field.selectionSet.selections) {
                partialResult[field.name.value][innerField.name.value] = partialResult[innerField.name.value];
                delete partialResult[innerField.name.value];
            }
        }
        
        for (const field of query.selectionSet.selections
            .filter(field => this.getDirective(type, field, 'toMany'))
        ) {
            // sub query...
            const directive = this.getDirective(type, field, 'toMany');
            const table = directive.arguments.find(arg => arg.name.value==="table").value.value;
            const leftCol = directive.arguments.find(arg => arg.name.value==="leftCol").value.value;
            const rightCol = directive.arguments.find(arg => arg.name.value==="rightCol").value.value;
            const innerSql = this.knexDb.from(table).where({ [rightCol]:partialResult[leftCol] });
            for (const innerField of field.selectionSet.selections) {
                innerSql.select(innerField.name.value);
            }
            partialResult[field.name.value] = await innerSql;
        }
        //console.log(partialResult);
        return partialResult;
    }

    getDirective(type, field, directive) {
        const fieldType = type.fields.find(f => f.name.value === field.name.value);
        const directives = fieldType.directives;
        const found = directives && directives.find(f => f.name.value === directive);
        return found;
    }
}

module.exports = GeneralAPI;