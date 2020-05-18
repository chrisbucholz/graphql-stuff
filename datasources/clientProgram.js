const { DataSource } = require('apollo-datasource');
const DataLoader = require('dataloader');

class ClientProgramAPI extends DataSource {
    constructor({ db }) {
        super();
        this.db = db;
        this.clientProgramLoader = new DataLoader((items) => this.getClientProgramsByIds({programIds: items}));
    }

    initialize(config) {
        this.context = config.context;
    }

    async getClientProgramById({ programId: id }) {
        return this.clientProgramLoader.load(id);
    }

    async getClientProgramsByIds({ programIds: ids }) {
        const joinedIds = ids.join(',');
        const found = await new Promise((resolve, reject) => db.query(`SELECT * FROM client_program WHERE cp_program_id IN (${joinedIds})`, (err, res) => {
            if (err) reject(err);
            resolve(res);
        }));
        return found;
    }

    async getClientProgramsByClientId({ clientId: id }) {
        const found = await new Promise((resolve, reject) => db.query(`SELECT * FROM client_program WHERE cp_client_id=${id}`, (err, res) => {
            if (err) reject(err);
            resolve(res);
        }));
        return found;
    }
}

module.exports = ClientProgramAPI;
