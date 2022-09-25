import { Socket } from 'socket.io-client'
import { useAtomValue } from 'jotai'
import { websocketAtom } from './atoms'
import { useUserActions, useUserValue } from '../user/hooks'
import { useGameActions, useInGameValue } from '../game/hooks'
import { useMessageActions } from '../message/hooks'
import { Events, Messages } from '../../enums'

export const useWebsocket = (): Socket => useAtomValue(websocketAtom)
export const useWebsocketEvents = (): Socket => {
  const websocket = useAtomValue(websocketAtom)
  const username = useUserValue()
  const inGame = useInGameValue()
  const { login } = useUserActions()
  const { setMessage } = useMessageActions()
  const { setBoard, setTurn, setInGame, setShowReplay } = useGameActions()

  websocket.on(Events.SignupFailure, (payload) => setMessage(payload.error))
  websocket.on(Events.LoginFailure, (payload) => setMessage(payload.error))

  websocket.on(Events.LoginSuccess, (user) => {
    setMessage(Messages.Clear)
    login(user)
  })

  websocket.on(Events.SignupSuccess, (user) => {
    setMessage(Messages.Clear)
    login(user)
  })

  websocket.on(Events.Board, (payload) => setBoard(payload))

  websocket.on(Events.Turn, ({ player, board }: { player: string, board: string[][] }) => {
    if (board.length > 0) setBoard(board)
    if (!inGame) {
      setInGame(true)
    }
    if (player === username) {
      setMessage(Messages.YourTurn)
      setTurn(true)
      return
    }
    setMessage(Messages.TheirTurn(player))
    setTurn(false)
  })

  websocket.on(Events.Victory, ({ player, board }: { player: string, board: string[][] }) => {
    if (board.length > 0) setBoard(board)
    setMessage(Messages.Victory(player))
    setInGame(false)
    setShowReplay(true)
  })

  return websocket
}
