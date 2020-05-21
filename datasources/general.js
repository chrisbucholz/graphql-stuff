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

    //async generalGet({ clientId, info }) {
    async generalGet({ rootSchema, rootTable, rootWhereColumn, rootWhereValue, info }) {
        const query = info.fieldNodes.find(field => field.name.value === info.fieldName);
        const sql = this.knexDb.from(rootTable).where({ [rootWhereColumn]:rootWhereValue }).first();
        const type = info.schema.getType(rootSchema).astNode;

        for (const field of query.selectionSet.selections
            //.filter(isFieldNode)
            //.filter(f => f.name.value !== "post")
            .filter(field => !this.getDirective(type, field, 'toOne') && !this.getDirective(type, field, 'toMany'))
        ) {
            sql.select(field.name.value);
        }

        // for (const field of query.selectionSet.selections
        // .filter(isFieldNode)
        // .filter(field => getDirective(type, field, 'toOne'))
        // ) {
        //   // left join...
        // }

        //const post = unflatten(await sql);        // TODO unflatten() needs to be written. Will turn a flat row into the JSON that's expected.

        const partialResult = await sql;

        for (const field of query.selectionSet.selections
            //.filter(isFieldNode)
            .filter(field => this.getDirective(type, field, 'toMany'))
        ) {
            // sub query...
            const directive = this.getDirective(type, field, 'toMany');
            const leftCol = directive.arguments.find(arg => arg.name.value==="leftCol").value.value;
            const rightCol = directive.arguments.find(arg => arg.name.value==="rightCol").value.value;
            const table = directive.arguments.find(arg => arg.name.value==="table").value.value;
            // TODO get the rootWhereVal a little more dynamically than not at all
            partialResult[field.name.value] = await this.knexDb.from(table).where({ [rightCol]:rootWhereValue }).select();
        }

        return partialResult;
    }

    getDirective(type, field, directive) {
        const fieldType = type.fields.filter(f => f.name.value === field.name.value);
        const directives = fieldType[0].directives;
        const found = directives && directives.filter(f => f.name.value === directive);
        return found[0];
    }

}

module.exports = GeneralAPI;