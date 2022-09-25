import { Socket } from 'socket.io'
import { Events } from '../../enums'
import ConnectionManager from '../ConnectionManager'

/**
 * Higher order function for finding an existing game.
 */
const findGame = (socket: Socket, manager: ConnectionManager) =>
  async (username: string) => {
    const index = manager.findConnectionIndexByUsername(username)
    const connection = manager.connections[index]
    if (!connection || !connection.game) return await manager.findGame(socket, username)
    const player = connection.player_x?.username === username ? connection.player_x : connection.player_o
    if (player) {
      player.socket = socket
      return manager.broadcast(index, Events.Turn, {
        player: connection.game.current_player,
        board: connection.game.board
      })
    }
  }

export default findGame
