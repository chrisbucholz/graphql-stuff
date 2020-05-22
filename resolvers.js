module.exports = {
    Query: {
        clients: (_, __, { dataSources }) => dataSources.clientAPI.getAllClients(),
        client: (_, { id }, { dataSources }) => dataSources.clientAPI.getClientById({ clientId: id }),
        clientProgram: (_, { id }, { dataSources }) => dataSources.clientProgramAPI.getClientProgramById({ programId: id }),
        clientProgramsByClient: (_, { id }, { dataSources }) => dataSources.clientProgramAPI.getClientProgramsByClientId({ clientId: id }),
        clinicianProgram: (_, { id }, { dataSources }) => dataSources.clinicianProgramAPI.getClinicianProgramById({ clinicianProgramId: id }),
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