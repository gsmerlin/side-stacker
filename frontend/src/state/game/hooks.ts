import { useAtomValue, useSetAtom } from 'jotai'
import { blankBoard, boardAtom, inGameAtom, showReplayAtom, turnAtom } from './atoms'
import { Socket } from 'socket.io-client'
import { IGameActions } from './interfaces'
import { useMessageActions } from '../message/hooks'
import { useUserValue } from '../user/hooks'
import { Events, Messages } from '../../enums'

export const useBoardValue = (): string[][] => useAtomValue(boardAtom)
export const useTurnValue = (): boolean => useAtomValue(turnAtom)
export const useInGameValue = (): boolean => useAtomValue(inGameAtom)
export const useShowReplayValue = (): boolean => useAtomValue(showReplayAtom)
export const useGameActions = (): IGameActions => {
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
      setMessage(Messages.Waiting)
      socket.emit(Events.Replay, username)
    },
    setBoard: (board) => setBoard(board),
    setTurn: (turn) => setTurn(turn),
    setInGame: (inGame) => setInGame(inGame),
    setShowReplay: (showReplay) => setShowReplay(showReplay)
  }
}
