module.exports = {
    Query: {
        clientProgram: (_, { id }, { dataSources }, info) => dataSources.generalAPI.generalGetR(
            {
                rootSchema: "ClientProgram", 
                rootTable: "client_program", 
                rootWhereColumn: "cp_program_id", 
                rootWhereValue: [id], 
                info: info 
            }
        ),
        client: (_, { id }, { dataSources }, info) => dataSources.generalAPI.generalGetR(
            {
                rootSchema: "Client", 
                rootTable: "client", 
                rootWhereColumn: "c_client_id", 
                rootWhereValue: [id], 
                info: info 
            }
        ),
        allClients: (_, { id }, { dataSources }, info) => dataSources.generalAPI.generalGetR(
            {
                rootSchema: "Client", 
                rootTable: "client", 
                rootWhereColumn: null, 
                rootWhereValue: null, 
                info: info,
                multiple: true
            }
        ),
        clientProgramsByClient: (_, { id }, { dataSources }, info) => dataSources.generalAPI.generalGetR(
            {
                rootSchema: "ClientProgram", 
                rootTable: "client_program", 
                rootWhereColumn: "cp_client_id", 
                rootWhereValue: [id], 
                info: info,
                multiple: true
            }
        ),
        clinicianProgram: (_, { id }, { dataSources }, info) => dataSources.generalAPI.generalGetR(
            {
                rootSchema: "ClinicianProgram", 
                rootTable: "clinician_program", 
                rootWhereColumn: "clp_clinician_program_id", 
                rootWhereValue: [id], 
                info: info,
            }
        ),
    },
}