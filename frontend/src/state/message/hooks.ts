import { useAtomValue, useSetAtom } from 'jotai'
import { messageAtom } from './atoms'
import { MessageActions } from './interface'

export const useMessageValue = (): string => useAtomValue(messageAtom)
export const useMessageActions = (): MessageActions => {
  const setMessage = useSetAtom(messageAtom)
  return {
    setMessage: (message) => setMessage(message)
  }
}
