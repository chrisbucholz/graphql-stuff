const { DataSource } = require('apollo-datasource');

class ClientAPI extends DataSource {
  constructor({ db }) {
    super();
    this.db = db;
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
    const found = await new Promise((resolve, reject) => db.query(`SELECT * FROM client WHERE c_client_id=${id}`, (err, res) => {
      if (err) reject(err);
      resolve(res);
    }));
    return found[0];
  }
}

module.exports = ClientAPI;
