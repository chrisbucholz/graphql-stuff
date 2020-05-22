
// TODO - Split this into a seperate schema for exp
// In App.js include a flag to use experimental mode
// Separate schema will not include the recursive 'Client', etc, resolvers. Just dumps all the Queries into generalAPI somehow
// This schema, cleaned up, will remove the exp cruft

module.exports = {
    Query: {
        clientProgram: (_, { id }, { dataSources }, info) => dataSources.generalAPI.generalGet(
            {
                rootSchema: "ClientProgram", 
                rootTable: "client_program", 
                rootWhereColumn: "cp_program_id", 
                rootWhereValue: id, 
                info: info 
            }
        ),
        client: (_, { id }, { dataSources }, info) => dataSources.generalAPI.generalGet(
            {
                rootSchema: "Client", 
                rootTable: "client", 
                rootWhereColumn: "c_client_id", 
                rootWhereValue: id, 
                info: info 
            }
        ),
    },

    Client : {
        //programs: ({ c_client_id }, __, { dataSources }) => dataSources.clientProgramAPI.getClientProgramsByClientId({ clientId: c_client_id })
    },

    ClientProgram : {
        //client: ({ cp_client_id }, __, { dataSources }) => dataSources.clientAPI.getClientById({ clientId: cp_client_id }),
        //program: ({ cp_program }, __, { dataSources }) => dataSources.programAPI.getProgramById({ programId: cp_program }),
        //clinicians:  ({ cp_program_id }, __, { dataSources }) => dataSources.clinicianProgramAPI.getClinicianProgramsByProgramId({ programId: cp_program_id })
    },

    ClinicianProgram : {
        //program: ({ clp_client_program }, __, { dataSources }) => dataSources.clientProgramAPI.getClientProgramById({ programId: clp_client_program })
    }
}