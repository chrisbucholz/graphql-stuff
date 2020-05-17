const { DataSource } = require('apollo-datasource');

class ClinicianProgramAPI extends DataSource {
  constructor({ db }) {
    super();
    this.db = db;
  }

  initialize(config) {
    this.context = config.context;
  }

  async getClinicianProgramById({ clinicianProgramId: id }) {
    const found = await new Promise((resolve, reject) => db.query(`SELECT * FROM clinician_program WHERE clp_clinician_program_id=${id}`, (err, res) => {
      if (err) reject(err);
      resolve(res);
    }));
    return found[0];
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
