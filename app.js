const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');
const app = express();
const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const PlayerAPI = require('./datasources/player');

const port = 5000;

const db = mysql.createConnection ({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'socka'
});

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to database');
});
global.db = db;

const server = new ApolloServer({ 
    typeDefs, 
    resolvers,
    dataSources: () => ({
        playerAPI: new PlayerAPI({ db })
    })
});

app.get('/put', function (req, res) {
    console.log('doing the put')
    db.query(`INSERT INTO players 
        (first_name,last_name,position,number,image,user_name)
        VALUES 
        ('Buddy','Budderson','Forward',11,'derf.jpg','bbudd')`);
    res.send('did our put request');
});

app.get('/get', function (req, res) {
    console.log('doing the get.')
    db.query(`SELECT * FROM players`, function (err, result) {
        res.send(JSON.stringify(result));    
    });
});

app.set('port', process.env.port || port); // set express to use this port
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // parse form data client
app.use(express.static(path.join(__dirname, 'public'))); // configure express to use public folder

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});

server.listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
});