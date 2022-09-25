import { Socket } from 'socket.io-client'

export interface IGameActions {
  resetGame: (socket: Socket) => void
  setBoard: (board: string[][]) => void
  setTurn: (turn: boolean) => void
  setInGame: (inGame: boolean) => void
  setShowReplay: (showReplay: boolean) => void
}
