import { Socket } from 'socket.io'
import Game from '../../Database/Game/model'

interface Player {
  socket: Socket
  username: string
}

export interface GameConnection {
  player_x?: Player
  player_o?: Player
  game?: Game
}
