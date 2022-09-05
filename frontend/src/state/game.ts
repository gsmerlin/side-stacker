import { atom, useAtomValue, useSetAtom } from 'jotai'
import Blank from '../assets/blank.png'
import { useMessageActions } from './message'
import { Socket } from 'socket.io-client'
import { useUserValue } from './user'
const blankBoard = Array(7)
  .fill('')
  .map(() => Array(7).fill(Blank))

const boardAtom = atom<string[][]>(blankBoard)
const turnAtom = atom<boolean>(false)
const inGameAtom = atom<boolean>(false)
const showReplayAtom = atom<boolean>(false)

export const useBoardValue = (): string[][] => useAtomValue(boardAtom)
export const useTurnValue = (): boolean => useAtomValue(turnAtom)
export const useInGameValue = (): boolean => useAtomValue(inGameAtom)
export const useShowReplayValue = (): boolean => useAtomValue(showReplayAtom)

interface GameActions {
  resetGame: (socket: Socket) => void
  setBoard: (board: string[][]) => void
  setTurn: (turn: boolean) => void
  setInGame: (inGame: boolean) => void
  setShowReplay: (showReplay: boolean) => void
}

export const useGameActions = (): GameActions => {
  const setBoard = useSetAtom(boardAtom)
  const username = useUserValue()
  const setTurn = useSetAtom(turnAtom)
  const setInGame = useSetAtom(inGameAtom)
  const setShowReplay = useSetAtom(showReplayAtom)
  const { setMessage } = useMessageActions()

  return {
    resetGame: (socket: Socket) => {
      setBoard(blankBoard)
      setTurn(false)
      setInGame(false)
      setShowReplay(false)
      setMessage('Waiting for opponent...')
      socket.emit('replay', username)
    },
    setBoard: (board) => setBoard(board),
    setTurn: (turn) => setTurn(turn),
    setInGame: (inGame) => setInGame(inGame),
    setShowReplay: (showReplay) => setShowReplay(showReplay)
  }
}
