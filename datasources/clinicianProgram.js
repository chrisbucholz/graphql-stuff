const { DataSource } = require('apollo-datasource');
const DataLoader = require('dataloader');

class ClinicianProgramAPI extends DataSource {
    constructor({ db }) {
        super();
        this.db = db;
        this.clinicianProgramLoader = new DataLoader((items) => this.getClinicianProgramsByIds({clinicianProgramIds: items}));
        this.clinicianProgramByProgramLoader = new DataLoader((items) => this.getClinicianProgramsByProgramIds({programIds: items}));
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
        return this.clinicianProgramByProgramLoader.load(id);
    }

    async getClinicianProgramsByProgramIds({ programIds: ids }) {
        const joinedIds = ids.join(',');
        const found = await new Promise((resolve, reject) => db.query(`SELECT * FROM clinician_program WHERE clp_client_program IN (${joinedIds})`, (err, res) => {
            if (err) reject(err);
            let composedResult = new Map();
            ids.forEach(item => {
                composedResult.set(item,[]);
            })
            res.forEach(item => {
                const curr = composedResult.get(item.clp_client_program);
                composedResult.set(item.clp_client_program,[...curr,item]);
            })
            const finalResult = Array.from(composedResult.values());
            resolve(finalResult);
        }));
        return found;
    }
}

module.exports = ClinicianProgramAPI;
