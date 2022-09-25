import { Socket } from 'socket.io'
import ConnectionManager from '../ConnectionManager'
import { Errors, Events } from '../../enums'

export interface IMove {
  row: number
  side: string
}

/**
 * Higher order function for performing a move
 */
const move = (socket: Socket, manager: ConnectionManager) =>
  async ({ row, side }: IMove) => {
    const index = manager.findIndexBySocket(socket)
    const connection = manager.connections[index] ?? null
    if (!connection || !connection.game) return socket.emit(Events.Error, { error: new Error(Errors.Game.NotFound) })

    const player = manager.getPlayer(index, socket)
    if (connection.game.current_player !== player?.username) {
      return socket.emit(Events.Turn, {
        player: connection.game.current_player,
        board: connection.game.board
      })
    }

    const { data } = await connection.game.dropPiece(row, side)
    if (!data) return
    const { type, payload } = data
    manager.broadcast(index, type, payload)
    if (type === 'victory') {
      manager.endGame(socket)
    }
  }

export default move
