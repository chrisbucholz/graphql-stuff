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
        let toOnes = [];

        const fieldRecurse = (schemaType, selections, path) => {
            for (const field of selections) {
                const toOneDirective = this.getDirective(schemaType.fields, field, 'toOne');
                const toManyDirective = this.getDirective(schemaType.fields, field, 'toMany');
                if (!toOneDirective && !toManyDirective) {
                    sql.select(field.name.value);
                } else if (toManyDirective) {
                    const subqueryType = this.getTypeName(type,field);
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
                    const subqueryType = this.getTypeName(schemaType,field);
                    const table = toOneDirective.arguments.find(arg => arg.name.value==="table").value.value;
                    const leftCol = toOneDirective.arguments.find(arg => arg.name.value==="leftCol").value.value;
                    const rightCol = toOneDirective.arguments.find(arg => arg.name.value==="rightCol").value.value;
                    sql.leftJoin(table, leftCol, rightCol);
                    const newPath = [...path, field.name.value]; 
                    const nextSchemaType = info.schema.getType(subqueryType).astNode;
                    fieldRecurse(nextSchemaType,field.selectionSet.selections, newPath);
                    toOnes.push(field);
                }
            }                
        }

        fieldRecurse(type,selections, []);
        const partialResult = await sql;

        // Turn the flat row of results into a JSON tree
        if (!Array.isArray(partialResult)) {
            this.unflattenRow(partialResult,toOnes);
        } else {
            partialResult.forEach(pr => {
                this.unflattenRow(pr,toOnes);
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

    getDirective(schemaFields, field, directive) {
        const fieldType = schemaFields.find(f => f.name.value === field.name.value);
        if (!fieldType) return false;
        const directives = fieldType.directives;
        const found = directives && directives.find(f => f.name.value === directive);
        return found;
    }

    getType(type, field) { 
        return type.fields.find(f => f.name.value === field.name.value);
    }

    getTypeName(type, field) {
        const typeSchema = type.fields.find(f => f.name.value === field.name.value);
        if (typeSchema.type.kind === "NonNullType" || typeSchema.type.kind === "ListType") {
            return typeSchema.type.type.name.value;
        } else {
            return typeSchema.type.name.value
        }
    }

    unflattenRow(pr, toOnes) {
        toOnes.forEach(field => {
            pr[field.name.value] = {};
            for (const innerField of field.selectionSet.selections) {
                pr[field.name.value][innerField.name.value] = pr[innerField.name.value];
                delete pr[innerField.name.value];
            }
        })
    }
    
}

module.exports = GeneralAPI;