import { createServer } from 'http'
import { Server } from 'socket.io'
import db from '../Database'
import userController from '../Database/User'
import ConnectionManager from './ConnectionManager'

const server = createServer()
const io = new Server(server, {
  cors: {
    origin: '*'
  }
})
const connectionManager = new ConnectionManager()

io.on('connection', async (client) => {
  if (!db.instance) await db.start()

  client.on('login', async ({ username, password: rawPassword }) => {
    const { data: user, error } = await userController.authenticateUser({ username, rawPassword })
    if (error) return client.emit('login failure', { error: error.message })
    if (!user) return client.emit('login failure', { error: new Error('Unknown error') })
    return client.emit('login success', username)
  })

  client.on('signup', async ({ username, password: rawPassword }) => {
    const { data: isExisting } = await userController.findUser({ username })
    if (isExisting) return client.emit('signup failure', { error: 'User already exists!' })
    const { error } = await userController.createUser({ username, rawPassword })
    if (error) {
      return client.emit('signup failure', { error: error.message })
    }
    return client.emit('signup success', username)
  })

  client.on('find game', async (username: string) => {
    const isInGame = connectionManager.findConnectionBySocket(client)
    if (isInGame) return
    const index = connectionManager.findConnectionIndexByUsername(username)
    if (index === -1) return await connectionManager.findGame(client, username)
    const connection = connectionManager.connections[index]
    if (!connection.game) return await connectionManager.findGame(client, username)
    if (connection.player_x?.username === username) {
      connection.player_x.socket = client
      return connectionManager.broadcast(index, 'turn', {
        player: connection.game.current_player,
        board: connection.game.board
      })
    }
    if (connection.player_o?.username === username) {
      connection.player_o.socket = client
      return connectionManager.broadcast(index, 'turn', {
        player: connection.game.current_player,
        board: connection.game.board
      })
    }
  })

  client.on('replay', async (username) => {
    connectionManager.removePlayerConnection(client)
    await connectionManager.findGame(client, username)
  })

  client.on('move', async ({ row, side }) => {
    const index = connectionManager.findIndexBySocket(client)
    const connection = connectionManager.connections[index]
    if (index === -1 || !connection.game) return client.emit('error', { error: new Error('Game not found') })

    const player = connectionManager.getPlayerBySocket(client)

    if (connection.game.current_player !== player) {
      return client.emit('turn', {
        player: connection.game.current_player,
        board: connection.game.board
      })
    }

    const { data } = await connection.game.dropPiece(row, side)
    if (!data) return
    const { type, payload } = data
    return connectionManager.broadcast(index, type, payload)
  })

  // client.on('disconnect', () => connectionManager.removePlayerConnection(client))
})

export default server
