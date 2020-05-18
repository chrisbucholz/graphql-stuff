const { DataSource } = require('apollo-datasource');
const DataLoader = require('dataloader');

class ClientProgramAPI extends DataSource {
    constructor({ db }) {
        super();
        this.db = db;
        this.clientProgramLoader = new DataLoader((items) => this.getClientProgramsByIds({programIds: items}));
        this.clientProgramsByClientLoader = new DataLoader((items) => this.getClientProgramsByClientIds({clientIds: items}));
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
        return this.clientProgramsByClientLoader.load(id);
    }

    async getClientProgramsByClientIds({ clientIds: ids }) {
        const joinedIds = ids.join(',');
        const found = await new Promise((resolve, reject) => db.query(`SELECT * FROM client_program WHERE cp_client_id IN (${joinedIds})`, (err, res) => {
            if (err) reject(err);
            let composedResult = new Map();
            ids.forEach(item => {
                composedResult.set(item,[]);
            })
            res.forEach(item => {
                const curr = composedResult.get(item.cp_client_id);
                composedResult.set(item.cp_client_id,[...curr,item]);
            })
            const finalResult = Array.from(composedResult.values());
            resolve(finalResult);
        }));
        return found;
    }
}

module.exports = ClientProgramAPI;
