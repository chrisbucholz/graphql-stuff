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

    async generalGetR({ rootSchema, rootTable, rootWhereColumn, rootWhereValue, info, selections = null, multiple = false }) {
        if (!selections) {
            selections = info.fieldNodes.find(field => field.name.value === info.fieldName).selectionSet.selections;
        }
        const type = info.schema.getType(rootSchema).astNode;
        const sql = !rootWhereColumn
            ? this.knexDb.from(rootTable)
            : this.knexDb.from(rootTable).whereIn(rootWhereColumn,rootWhereValue);

        if (!multiple) {
            sql.first();
        }
        
        sql.select(rootWhereColumn);        // needed to differentiate toMany results
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
        if (!Array.isArray(partialResult)) {
            for (const field of selections
                .filter(field => this.getDirective(type, field, 'toOne'))
            ) {
                partialResult[field.name.value] = {};
                for (const innerField of field.selectionSet.selections) {
                    partialResult[field.name.value][innerField.name.value] = partialResult[innerField.name.value];
                    delete partialResult[innerField.name.value];
                }
            }
        } else {
            partialResult.forEach(pr => {
                for (const field of selections
                    .filter(field => this.getDirective(type, field, 'toOne'))
                ) {
                    pr[field.name.value] = {};
                    for (const innerField of field.selectionSet.selections) {
                        pr[field.name.value][innerField.name.value] = pr[innerField.name.value];
                        delete pr[innerField.name.value];
                    }
                }
            })
        }

        // Process all the discovered toMany as seperate subqueries. These will get injected back into generalGetR() and their results pinned to partialResult
        for (const subquery of subqueries) {
            let rootWhereValues = [];
            let currNodes = [];
            if (!Array.isArray(partialResult)) {
                let currNode = partialResult;
                let lastNode = partialResult;
                for (const node of subquery.path) {
                    lastNode = currNode;
                    currNode = currNode[node];
                }
                rootWhereValues.push(lastNode[subquery.leftCol]);
                currNodes.push(currNode);
                currNode[subquery.field] = [];
            } else {
                partialResult.forEach(pr => {
                    let currNode = pr;
                    let lastNode = pr;
                    for (const node of subquery.path) {
                        lastNode = currNode;
                        currNode = currNode[node];
                    }
                    rootWhereValues.push(lastNode[subquery.leftCol]);
                    currNodes.push(currNode);
                    currNode[subquery.field] = [];
                })
            }
            
            const subqueryResult = await this.generalGetR({ 
                rootSchema: subquery.subqueryType, 
                rootTable: subquery.table, 
                rootWhereColumn: subquery.rightCol, 
                rootWhereValue: rootWhereValues,
                info: info,
                selections: subquery.selections,
                multiple : true
            });
            
            if (currNodes.length === 1) {      
                currNodes[0][subquery.field] = subqueryResult;
            } else {
                subqueryResult.forEach(sr => {
                    const srKey = sr[subquery.rightCol]; 
                    const foundNode = currNodes.find(f => f[subquery.leftCol] === srKey);        
                    foundNode[subquery.field] = [sr];
                })
            }
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