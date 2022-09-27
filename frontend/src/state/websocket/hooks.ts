import { Socket } from 'socket.io-client'
import { useAtomValue } from 'jotai'
import { websocketAtom } from './atoms'
import { useUserActions, useUserValue } from '../user/hooks'
import { useGameActions, useInGameValue } from '../game/hooks'
import { useMessageActions } from '../message/hooks'
import { Events, Messages } from '../../enums'
import { useTimerActions } from '../timer/hooks'
import { IUserInfo } from '../user/interfaces'

export const useWebsocket = (): Socket => {
  const websocket = useAtomValue(websocketAtom)
  const { username } = useUserValue()
  const inGame = useInGameValue()
  const { login, signup, updateUser } = useUserActions()
  const { setTimer } = useTimerActions()
  const { setMessage } = useMessageActions()
  const { setBoard, setTurn, setInGame, setShowReplay } = useGameActions()

  websocket.on(Events.SignupFailure, (payload) => setMessage(payload.error))
  websocket.on(Events.LoginFailure, (payload) => setMessage(payload.error))

  websocket.on(Events.LoginSuccess, (user: IUserInfo) => {
    setMessage(Messages.Clear)
    login(user)
  })

  websocket.on(Events.SignupSuccess, (username: string) => {
    setMessage(Messages.Clear)
    signup(username)
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
    websocket.emit(Events.Profile, username)
  })

  websocket.on(Events.Profile, (user: IUserInfo) => updateUser(user))

  websocket.on(Events.Timer, (timer: string) => setTimer(timer))

  return websocket
}
