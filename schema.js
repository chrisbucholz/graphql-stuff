const { gql } = require('apollo-server');

const typeDefs = gql`

    directive @toOne on FIELD_DEFINITION
    directive @toMany on FIELD_DEFINITION

    type Client {
        c_client_id: ID!
        c_first_name: String
        c_last_name: String
        c_full_name: String
        c_dob: Int
        c_file_no: String
        programs: [ClientProgram]
        programsexp: [ClientProgramExp] @toMany
    }

    type ClientProgram {
        cp_program_id: ID!
        cp_client_id: Int!
        cp_program: Int!
        cp_referral_date: Int
        cp_start_date: Int
        cp_discharge_date: Int
        client: Client! @toOne
        program: Program! @toOne
        clinicians: [ClinicianProgram] @toMany
    }

    type ClientProgramExp {
        cp_program_id: ID!
        cp_client_id: Int!
        cp_program: Int!
        cp_referral_date: Int
        cp_start_date: Int
        cp_discharge_date: Int
        client: Client!
        program: Program!
        clinicians: [ClinicianProgram]
    }

    type ClinicianProgram {
        clp_clinician_program_id: ID!
        clp_client_program: Int!
        clp_referral_date: Int
        clp_start_date: Int
        clp_discharge_date: Int
        clp_name: String!
        program: ClientProgram! @toOne
    }

    type Program {
        p_program_id: ID!
        p_program_name: String!
        p_program_short_name: String!
    }

    type Query {
        clients: [Client]!
        client(id: ID!): Client
        clientexp(id: ID!): Client
        clientProgram(id: ID!): ClientProgram
        clientProgramsByClient(id: ID!): [ClientProgram]
        clinicianProgram(id: ID!): ClinicianProgram
    }
`;

module.exports = typeDefs;