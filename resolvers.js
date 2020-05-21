module.exports = {
    Query: {
        clients: (_, __, { dataSources }) => dataSources.clientAPI.getAllClients(),
        client: (_, { id }, { dataSources }) => dataSources.clientAPI.getClientById({ clientId: id }),
        clientProgram: (_, { id }, { dataSources }) => dataSources.clientProgramAPI.getClientProgramById({ programId: id }),
        clientProgramExp: (_, { id }, { dataSources }, info) => dataSources.generalAPI.generalGet(
            {
                rootSchema: "ClientProgramExp", 
                rootTable: "client_program", 
                rootWhereColumn: "cp_program_id", 
                rootWhereValue: id, 
                info: info 
            }
        ),
        clientProgramsByClient: (_, { id }, { dataSources }) => dataSources.clientProgramAPI.getClientProgramsByClientId({ clientId: id }),
        clinicianProgram: (_, { id }, { dataSources }) => dataSources.clinicianProgramAPI.getClinicianProgramById({ clinicianProgramId: id }),
        clientexp: (_, { id }, { dataSources }, info) => dataSources.clientAPI.getClientByIdExp({ clientId: id, info }),
        clientexp2: (_, { id }, { dataSources }, info) => dataSources.generalAPI.generalGet(
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
        programs: ({ c_client_id }, __, { dataSources }) => dataSources.clientProgramAPI.getClientProgramsByClientId({ clientId: c_client_id })
    },

    ClientProgram : {
        client: ({ cp_client_id }, __, { dataSources }) => dataSources.clientAPI.getClientById({ clientId: cp_client_id }),
        program: ({ cp_program }, __, { dataSources }) => dataSources.programAPI.getProgramById({ programId: cp_program }),
        clinicians:  ({ cp_program_id }, __, { dataSources }) => dataSources.clinicianProgramAPI.getClinicianProgramsByProgramId({ programId: cp_program_id })
    },

    ClinicianProgram : {
        program: ({ clp_client_program }, __, { dataSources }) => dataSources.clientProgramAPI.getClientProgramById({ programId: clp_client_program })
    }
}