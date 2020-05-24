module.exports = {
    Query: {
        //clientProgram: (_, { id }, { dataSources }, info) => dataSources.generalAPI.generalGet(
        clientProgram: (_, { id }, { dataSources }, info) => dataSources.generalAPI.generalGetR(
            {
                rootSchema: "ClientProgram", 
                rootTable: "client_program", 
                rootWhereColumn: "cp_program_id", 
                //rootWhereValue: id, 
                rootWhereValue: [id], 
                info: info 
            }
        ),
        //client: (_, { id }, { dataSources }, info) => dataSources.generalAPI.generalGet(
        client: (_, { id }, { dataSources }, info) => dataSources.generalAPI.generalGetR(
            {
                rootSchema: "Client", 
                rootTable: "client", 
                rootWhereColumn: "c_client_id", 
                //rootWhereValue: id, 
                rootWhereValue: [id], 
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