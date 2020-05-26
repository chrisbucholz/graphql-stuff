const { gql } = require('apollo-server');

const typeDefs = gql`

    directive @toOne(table: String, leftCol: String, rightCol: String) on FIELD_DEFINITION
    directive @toMany(table: String, leftCol: String, rightCol: String) on FIELD_DEFINITION

    type Client {
        c_client_id: ID!
        c_first_name: String
        c_last_name: String
        c_full_name: String
        c_dob: Int
        c_file_no: String
        programs: [ClientProgram] @toMany(table:"client_program", leftCol: "c_client_id", rightCol: "cp_client_id")
    }

    type ClientProgram {
        cp_program_id: ID!
        cp_client_id: Int!
        cp_program: Int!
        cp_referral_date: Int
        cp_start_date: Int
        cp_discharge_date: Int
        client: Client! @toOne(table:"client", leftCol: "cp_client_id", rightCol: "c_client_id")
        program: Program! @toOne(table:"program", leftCol: "cp_program", rightCol: "p_program_id")
        clinicians: [ClinicianProgram] @toMany(table:"clinician_program", leftCol: "cp_program_id", rightCol: "clp_client_program")
    }

    type ClinicianProgram {
        clp_clinician_program_id: ID!
        clp_client_program: Int!
        clp_referral_date: Int
        clp_start_date: Int
        clp_discharge_date: Int
        clp_name: String!
        program: ClientProgram! @toOne(table:"client_program", leftCol: "clp_client_program", rightCol: "cp_program_id")
    }

    type Program {
        p_program_id: ID!
        p_program_name: String!
        p_program_short_name: String!
    }

    type Query {
        client(id: ID!): Client
        allClients: [Client]
        clientProgram(id: ID!): ClientProgram
        clientProgramsByClient(id: ID!): [ClientProgram]
        clinicianProgram(id: ID!) : ClinicianProgram
    }
`;

module.exports = typeDefs;