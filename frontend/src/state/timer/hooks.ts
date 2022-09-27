import { useAtomValue, useSetAtom } from 'jotai'
import { ITimerActions } from './interfaces'
import { timerAtom } from './atoms'

export const useTimerValue = (): string => useAtomValue(timerAtom)
export const useTimerActions = (): ITimerActions => {
  const setTimer = useSetAtom(timerAtom)
  return {
    setTimer: timer => setTimer(timer)
  }
}
