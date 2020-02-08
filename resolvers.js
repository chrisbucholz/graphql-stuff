module.exports = {
    Query: {
        players: (_, __, { dataSources }) => dataSources.playerAPI.getAllPlayers(),
        player: (_, { id }, { dataSources }) => dataSources.playerAPI.getPlayerById({ playerId: id })
    }
}