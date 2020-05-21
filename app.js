const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');
const app = express();
const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const ClientAPI = require('./datasources/client');
const ClientProgramAPI = require('./datasources/clientProgram');
const ClinicianProgramAPI = require('./datasources/clinicianProgram');
const ProgramAPI = require('./datasources/program');
const GeneralAPI = require('./datasources/general');

const port = 5000;

const db = mysql.createConnection ({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'chris_pcs'
});

db.connect((err) => {
    if (err) {
        console.error('Failed to connect to database');
        throw err;
    }
    console.log('Connected to database');
});
global.db = db;

const server = new ApolloServer({ 
    typeDefs, 
    resolvers,
    dataSources: () => ({
        clientAPI: new ClientAPI({db}),
        clientProgramAPI: new ClientProgramAPI({db}),
        clinicianProgramAPI: new ClinicianProgramAPI({db}),
        programAPI: new ProgramAPI({db}),
        generalAPI: new GeneralAPI({db}),
    })
});

// Good chance we don't need this Express stuff any more for graphQl
app.set('port', process.env.port || port); // set express to use this port
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // parse form data client
app.use(express.static(path.join(__dirname, 'public'))); // configure express to use public folder
app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});

server.listen().then(({ url }) => {
    console.log(`🚀 Apollo Server ready at ${url}`);
});