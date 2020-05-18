const { DataSource } = require('apollo-datasource');
const DataLoader = require('dataloader');

class ClientAPI extends DataSource {
  constructor({ db }) {
    super();
    this.db = db;
    this.clientLoader = new DataLoader((items) => {
      console.log('inside batch function');
      return this.getClientsByIds({clientIds: items})});
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
    console.log('inside regular getClient');
    this.clientLoader.load(id);
    const found = await new Promise((resolve, reject) => db.query(`SELECT * FROM client WHERE c_client_id=${id}`, (err, res) => {
      if (err) reject(err);
      resolve(res);
    }));
    return found[0];
  }

  async getClientsByIds({ clientIds: ids }) {
    console.log('inside regular getClients');
    console.log(ids);
    const joinedIds = ids.join(',');
    const found = await new Promise((resolve, reject) => db.query(`SELECT * FROM client WHERE c_client_id IN (${joinedIds})`, (err, res) => {
      if (err) reject(err);
      resolve(res);
    }));
    return found;
  }
}

module.exports = ClientAPI;
