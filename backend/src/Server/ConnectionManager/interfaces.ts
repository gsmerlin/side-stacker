import { Socket } from 'socket.io'
import Game from '../../Database/Game/model'

export interface IPlayer {
  socket: Socket
  username: string
}

export interface IGameConnection {
  player_x?: IPlayer
  player_o?: IPlayer
  game?: Game
}
