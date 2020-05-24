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

    async generalGetR({ rootSchema, rootTable, rootWhereColumn, rootWhereValue, info, selections = null, multiple = false }) {
        if (!selections) {
            selections = info.fieldNodes.find(field => field.name.value === info.fieldName).selectionSet.selections;
        }
        
        const type = info.schema.getType(rootSchema).astNode;
        const sql = multiple 
            ? this.knexDb.from(rootTable).where({ [rootWhereColumn]:rootWhereValue })
            : this.knexDb.from(rootTable).where({ [rootWhereColumn]:rootWhereValue }).first();
        
        let subqueries = [];
        
        const fieldRecurse = (selections, path) => {
            for (const field of selections) {
                const toOneDirective = this.getDirective(type, field, 'toOne');
                const toManyDirective = this.getDirective(type, field, 'toMany');
                if (!toOneDirective && !toManyDirective) {
                    sql.select(field.name.value);
                } else if (toManyDirective) {
                    const subqueryType = this.getType(type,field).type.type.name.value;            
                    const table = toManyDirective.arguments.find(arg => arg.name.value==="table").value.value;
                    const leftCol = toManyDirective.arguments.find(arg => arg.name.value==="leftCol").value.value;
                    const rightCol = toManyDirective.arguments.find(arg => arg.name.value==="rightCol").value.value;
                    
                    // ensure the leftCol value is fetched so we can join on it.
                    sql.select(leftCol);

                    // add to list of subqueries to run later
                    subqueries.push({
                        field: field.name.value,
                        path: path,
                        subqueryType: subqueryType, 
                        table: table, 
                        leftCol: leftCol, 
                        rightCol: rightCol, 
                        selections: field.selectionSet.selections
                    });
        
                } else if (toOneDirective) {
                    const table = toOneDirective.arguments.find(arg => arg.name.value==="table").value.value;
                    const leftCol = toOneDirective.arguments.find(arg => arg.name.value==="leftCol").value.value;
                    const rightCol = toOneDirective.arguments.find(arg => arg.name.value==="rightCol").value.value;
                    sql.leftJoin(table, leftCol, rightCol);
                    const newPath = [...path, field.name.value]
                    fieldRecurse(field.selectionSet.selections, newPath);
                }
            }                
        }

        fieldRecurse(selections, []);

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
        for (const subquery of subqueries) {
            let currNode = partialResult;
            for (const node of subquery.path) {
                currNode = currNode[node];
            }

            const subqueryResult = await this.generalGetR({ 
                rootSchema: subquery.subqueryType, 
                rootTable: subquery.table, 
                rootWhereColumn: subquery.rightCol, 
                rootWhereValue: currNode[subquery.leftCol],
                info: info,
                selections: subquery.selections,
                multiple : true
            });
            
            currNode[subquery.field] = subqueryResult;
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