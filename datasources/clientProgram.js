const { DataSource } = require('apollo-datasource');

class ClientProgramAPI extends DataSource {
    constructor({ db }) {
        super();
        this.db = db;
    }

    initialize(config) {
        this.context = config.context;
    }

    async getClientProgramById({ programId: id }) {
        const found = await new Promise((resolve, reject) => db.query(`SELECT * FROM client_program WHERE cp_program_id=${id}`, (err, res) => {
            if (err) reject(err);
            resolve(res);
        }));
        return found[0];
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
