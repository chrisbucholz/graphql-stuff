const { gql } = require('apollo-server');

const typeDefs = gql`
    type Player {
        id: ID!
        first_name: String
        last_name: String
        position: String
        number: Int
        image: String
        user_name: String
    }

    type Query {
        players: [Player]!
        player(id: ID!): Player
    }
`;

module.exports = typeDefs;