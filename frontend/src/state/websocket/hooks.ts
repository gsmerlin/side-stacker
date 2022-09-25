import { Socket } from 'socket.io-client'
import { useAtomValue } from 'jotai'
import { websocketAtom } from './atoms'
import { useUserActions, useUserValue } from '../user/hooks'
import { useGameActions, useInGameValue } from '../game/hooks'
import { useMessageActions } from '../message/hooks'

export const useWebsocket = (): Socket => useAtomValue(websocketAtom)
export const useWebsocketEvents = (): Socket => {
  const websocket = useAtomValue(websocketAtom)
  const username = useUserValue()
  const inGame = useInGameValue()
  const { login } = useUserActions()
  const { setMessage } = useMessageActions()
  const { setBoard, setTurn, setInGame, setShowReplay } = useGameActions()

  websocket.on('signup failure', (payload) => setMessage(payload.error))
  websocket.on('login failure', (payload) => setMessage(payload.error))
  websocket.on('login success', (user) => {
    setMessage('')
    login(user)
  })

  websocket.on('signup success', (user) => {
    setMessage('')
    login(user)
  })

  websocket.on('board', (payload) => setBoard(payload))

  websocket.on('turn', ({ player, board }: { player: string, board: string[][] }) => {
    if (board.length > 0) setBoard(board)
    if (!inGame) {
      setInGame(true)
    }
    if (player === username) {
      setMessage('Your turn!')
      setTurn(true)
      return
    }
    setMessage(`${player}'s turn!`)
    setTurn(false)
  })

  websocket.on('victory', ({ player, board }: { player: string, board: string[][] }) => {
    if (board.length > 0) setBoard(board)
    setMessage(`${player} wins!`)
    setInGame(false)
    setShowReplay(true)
  })

  return websocket
}
