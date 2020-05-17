const { gql } = require('apollo-server');

// const typeDefs = gql`
//     type Player {
//         id: ID!
//         first_name: String
//         last_name: String
//         position: String
//         number: Int
//         image: String
//         user_name: String
//     }

//     type Query {
//         players: [Player]!
//         player(id: ID!): Player
//     }
// `;

const typeDefs = gql`
    type Client {
        c_client_id: ID!
        c_first_name: String
        c_last_name: String
        c_full_name: String
        c_dob: Int
        c_file_no: String
    }

    type Query {
        clients: [Client]!
        client(id: ID!): Client
    }
`;

module.exports = typeDefs;