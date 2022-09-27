import { createServer } from 'http'
import { Server } from 'socket.io'
import db from '../Database'
import ConnectionManager from './ConnectionManager'
import login from './handlers/login'
import { Events } from '../enums'
import signup from './handlers/signup'
import findGame from './handlers/findGame'
import replay from './handlers/replay'
import move from './handlers/move'
import profile from './handlers/profile'

const server = createServer()
const io = new Server(server, {
  cors: {
    origin: '*'
  }
})
const connectionManager = new ConnectionManager()

io.on(Events.Connection, async (client) => {
  if (!db.instance) await db.start()

  client.on(Events.Login, login(client))

  client.on(Events.Signup, signup(client))

  client.on(Events.FindGame, findGame(client, connectionManager))

  client.on(Events.Replay, replay(client, connectionManager))

  client.on(Events.Move, move(client, connectionManager))

  client.on(Events.Profile, profile(client))
})

export default server
