import { GameConnection } from './interfaces'
import { Socket } from 'socket.io'
import gameController from '../../Database/Game'

class ConnectionManager {
  connections: GameConnection[] = []
  findIndexBySocket = (socket: Socket): number => {
    return this.connections.findIndex(
      (c) => c.player_x?.socket.id === socket.id || c.player_o?.socket.id === socket.id
    )
  }

  findConnectionBySocket = (socket: Socket): GameConnection | undefined => {
    const index = this.findIndexBySocket(socket)
    if (index === -1) return undefined
    return this.connections[index]
  }

  findConnectionIndexByUsername = (username: string): number => {
    return this.connections.findIndex((c) => c.player_x?.username === username || c.player_o?.username === username)
  }

  removePlayerConnection = (socket: Socket): void => {
    const index = this.findIndexBySocket(socket)
    const username = this.getPlayerBySocket(socket)
    if (index === -1) return
    const connection = this.connections[index]
    if (connection?.player_x && connection.player_x.username === username) {
      delete connection.player_x
    }
    if (connection?.player_o && connection.player_o.username === username) {
      delete connection.player_o
    }
    if (!connection.player_x && !connection.player_o) this.connections.splice(index, 1)
    if (connection.player_x) connection.player_x.socket.emit('opponent left')
    if (connection.player_o) connection.player_o.socket.emit('opponent left')
  }

  getPlayerBySocket = (socket: Socket): string | undefined => {
    const index = this.findIndexBySocket(socket)
    if (index === -1) return undefined
    return this.connections[index].player_x?.socket === socket ? this.connections[index].player_x?.username : this.connections[index].player_o?.username
  }

  broadcast = (index: number, type: string, payload: any): void => {
    const connection = this.connections[index]
    if (!connection) return
    if (!connection.player_x?.socket || !connection.player_o?.socket) return
    connection.player_x.socket.emit(type, payload)
    connection.player_o.socket.emit(type, payload)
  }

  findGame = async (client: Socket, username: string): Promise<void> => {
    const index = this.connections.findIndex((c) => !c.game)
    if (index === -1) {
      this.connections.push({ player_x: { socket: client, username } })
      client.emit('waiting')
      return
    }
    const connection = this.connections[index]
    if (!connection.player_x && connection.player_o?.username !== username) {
      connection.player_x = { socket: client, username }
    }
    if (!connection.player_o && connection.player_x?.username !== username) {
      connection.player_o = { socket: client, username }
    }
    if (!connection.player_o || !connection.player_x) {
      client.emit('waiting')
      return
    }
    const { data: game } = await gameController.createGame({
      playerX: connection.player_x?.username ?? '',
      playerO: connection.player_o?.username ?? ''
    })
    if (game) {
      connection.game = game
      this.broadcast(index, 'turn', {
        player: connection.game.current_player,
        board: connection.game.board
      })
    }
  }
}

export default ConnectionManager
