const { DataSource } = require('apollo-datasource');
const DataLoader = require('dataloader');

class ClinicianProgramAPI extends DataSource {
    constructor({ db }) {
        super();
        this.db = db;
        this.clinicianProgramLoader = new DataLoader((items) => this.getClinicianProgramsByIds({clinicianProgramIds: items}));
    }

    initialize(config) {
        this.context = config.context;
    }

    async getClinicianProgramById({ clinicianProgramId: id }) {
        return this.clinicianProgramLoader.load(id);
    }

    async getClinicianProgramByIds({ clinicianProgramIds: ids }) {
        const joinedIds = ids.join(',');
        const found = await new Promise((resolve, reject) => db.query(`SELECT * FROM clinician_program WHERE clp_clinician_program_id IN (${joinedIds})`, (err, res) => {
            if (err) reject(err);
            resolve(res);
        }));
        return found;
    }

    async getClinicianProgramsByProgramId({ programId: id }) {
        const found = await new Promise((resolve, reject) => db.query(`SELECT * FROM clinician_program WHERE clp_client_program=${id}`, (err, res) => {
            if (err) reject(err);
            resolve(res);
        }));
        return found;
    }
}

module.exports = ClinicianProgramAPI;
