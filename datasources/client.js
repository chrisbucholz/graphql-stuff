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
        const found = await this.knexDb.from("client").where({ c_client_id:clientId }).first();
        return found;
    }
}

module.exports = ClientAPI;
