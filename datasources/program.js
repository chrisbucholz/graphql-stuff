const { DataSource } = require('apollo-datasource');
const DataLoader = require('dataloader');

class ProgramAPI extends DataSource {
    constructor({ db }) {
        super();
        this.db = db;
        this.programLoader = new DataLoader((items) => this.getProgramsByIds({programIds: items}));
    }

    initialize(config) {
        this.context = config.context;
    }

    async getProgramById({ programId: id }) {
        return this.programLoader.load(id);
    }

    async getProgramsByIds({ programIds: ids }) {
        const joinedIds = ids.join(',');
        const found = await new Promise((resolve, reject) => db.query(`SELECT * FROM program WHERE p_program_id IN (${joinedIds})`, (err, res) => {
        if (err) reject(err);
            resolve(res);
            }));
        return found;
    }
}

module.exports = ProgramAPI;
