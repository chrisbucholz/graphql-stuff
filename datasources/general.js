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
                database: 'graph_pcs'
            }
        });
    }

    initialize(config) {
        this.context = config.context;
    }

    async generalGet({ rootSchema, rootTable, rootWhereColumn, rootWhereValue, info, selections = null, multiple = false }) {
        if (!selections) {
            selections = info.fieldNodes.find(field => field.name.value === info.fieldName).selectionSet.selections;
        }
        
        const type = info.schema.getType(rootSchema).astNode;
        const sql = multiple 
            ? this.knexDb.from(rootTable).where({ [rootWhereColumn]:rootWhereValue })
            : this.knexDb.from(rootTable).where({ [rootWhereColumn]:rootWhereValue }).first();
        
        // SELECT the requested values only.
        for (const field of selections
            .filter(field => !this.getDirective(type, field, 'toOne') && !this.getDirective(type, field, 'toMany'))
        ) {
            sql.select(field.name.value);
        }

        // If we have toMany fields to get, SELECT the leftCol value for the subqueries
        for (const field of selections
            .filter(field => this.getDirective(type, field, 'toMany'))
        ) {
            const directive = this.getDirective(type, field, 'toMany');
            const leftCol = directive.arguments.find(arg => arg.name.value==="leftCol").value.value;
            sql.select(leftCol);
        }

        // toOne left join and (TBD) recurse.
        for (const field of selections
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
        for (const field of selections
            .filter(field => this.getDirective(type, field, 'toOne'))
        ) {
            partialResult[field.name.value] = {};
            for (const innerField of field.selectionSet.selections) {
                partialResult[field.name.value][innerField.name.value] = partialResult[innerField.name.value];
                delete partialResult[innerField.name.value];
            }
        }
        
        // toMany subquery via recursion
        for (const field of selections
            .filter(field => this.getDirective(type, field, 'toMany'))
        ) {
            const directive = this.getDirective(type, field, 'toMany');
            const myType = this.getType(type,field).type.type.name.value;            
            const table = directive.arguments.find(arg => arg.name.value==="table").value.value;
            const leftCol = directive.arguments.find(arg => arg.name.value==="leftCol").value.value;
            const rightCol = directive.arguments.find(arg => arg.name.value==="rightCol").value.value;

            partialResult[field.name.value] = await this.generalGet({ 
                rootSchema: myType, 
                rootTable: table, 
                rootWhereColumn: rightCol, 
                rootWhereValue: partialResult[leftCol], 
                info: info,
                selections: field.selectionSet.selections,
                multiple : true
            });            
        }
        return partialResult;
    }

    getDirective(type, field, directive) {
        const fieldType = type.fields.find(f => f.name.value === field.name.value);
        if (!fieldType) return false;
        const directives = fieldType.directives;
        const found = directives && directives.find(f => f.name.value === directive);
        return found;
    }

    getType(type, field) {
        return type.fields.find(f => f.name.value === field.name.value);
    }
}

module.exports = GeneralAPI;