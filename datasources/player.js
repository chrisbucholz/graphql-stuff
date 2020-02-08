const { DataSource } = require('apollo-datasource');

class PlayerAPI extends DataSource {
  constructor({ db }) {
    super();
    this.db = db;
  }

  initialize(config) {
    this.context = config.context;
  }

  async getAllPlayers() {
    const found = await new Promise((resolve, reject) => db.query(`SELECT * FROM players`, (err, res) => {
      if (err) reject(err);
      resolve(res);
    }));
    return found;
  }

  async getPlayerById({ playerId: id }) {
    const found = await new Promise((resolve, reject) => db.query(`SELECT * FROM players WHERE id=${id}`, (err, res) => {
      if (err) reject(err);
      resolve(res);
    }));
    return found[0];
  }
}

module.exports = PlayerAPI;
