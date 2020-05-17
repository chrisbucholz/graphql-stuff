module.exports = {
    Query: {
        //players: (_, __, { dataSources }) => dataSources.playerAPI.getAllPlayers(),
        //player: (_, { id }, { dataSources }) => dataSources.playerAPI.getPlayerById({ playerId: id })
        clients: (_, __, { dataSources }) => dataSources.clientAPI.getAllClients(),
        client: (_, { id }, { dataSources }) => dataSources.clientAPI.getClientById({ clientId: id })
    }
}