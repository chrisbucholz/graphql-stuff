const { DataSource } = require('apollo-datasource');

class ProgramAPI extends DataSource {
    constructor({ db }) {
        super();
        this.db = db;
    }

    initialize(config) {
        this.context = config.context;
    }

    async getProgramById({ programId: id }) {
        const found = await new Promise((resolve, reject) => db.query(`SELECT * FROM program WHERE p_program_id=${id}`, (err, res) => {
        if (err) reject(err);
            resolve(res);
            }));
        return found[0];
    }
}

module.exports = ProgramAPI;
