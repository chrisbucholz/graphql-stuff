const { DataSource } = require('apollo-datasource');
const DataLoader = require('dataloader');
const Knex = require('knex');

class ClientAPI extends DataSource {
    constructor({ db }) {
        super();
        this.db = db;
        this.clientLoader = new DataLoader((items) => this.getClientsByIds({clientIds: items}));
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

    async getAllClients() {
        const found = await new Promise((resolve, reject) => db.query(`SELECT * FROM client`, (err, res) => {
            if (err) reject(err);
            resolve(res);
        }));
        return found;
    }

    async getClientById({ clientId: id }) {
        return this.clientLoader.load(id);
    }

    async getClientsByIds({ clientIds: ids }) {
        const joinedIds = ids.join(',');
        const found = await new Promise((resolve, reject) => db.query(`SELECT * FROM client WHERE c_client_id IN (${joinedIds})`, (err, res) => {
        if (err) reject(err);
            resolve(res);
        }));
        return found;
    }

    async getClientByIdExp({ clientId, info }) {
        const query = info.fieldNodes.find(field => field.name.value === info.fieldName);
        const sql = this.knexDb.from("client").where({ c_client_id:clientId }).first();
        const type = info.schema.getType('Client').astNode;

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
            partialResult[field.name.value] = await this.knexDb.from("client_program").where({ cp_client_id:clientId }).select();
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

module.exports = ClientAPI;
