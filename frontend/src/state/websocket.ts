import { atom, useAtomValue } from 'jotai'
import { io, Socket } from 'socket.io-client'
import { useUserActions, useUserValue } from './user'
import { useGameActions, useInGameValue } from './game'
import { useMessageActions } from './message'

const socket = io('http://localhost:4000')
const websocketAtom = atom<Socket>(socket)

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

  websocket.on('turn', ({ player, board }: {player: string, board: string[][]}) => {
    if (board.length > 0) setBoard(board)
    if (!inGame) { setInGame(true) }
    if (player === username) {
      setMessage('Your turn!')
      setTurn(true)
      return
    }
    setMessage(`${player}'s turn!`)
    setTurn(false)
  })

  websocket.on('victory', ({ player, board }: {player: string, board: string[][]}) => {
    if (board.length > 0) setBoard(board)
    setMessage(`${player} wins!`)
    setInGame(false)
    setShowReplay(true)
  })

  return websocket
}
