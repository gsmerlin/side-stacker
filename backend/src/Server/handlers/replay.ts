import { Socket } from 'socket.io'
import ConnectionManager from '../ConnectionManager'

/**
 * Higher order function for fetching a new game
 */
const replay = (socket: Socket, manager: ConnectionManager) => async (username: string) => {
  manager.removePlayerConnection(socket)
  await manager.findGame(socket, username)
}

export default replay
