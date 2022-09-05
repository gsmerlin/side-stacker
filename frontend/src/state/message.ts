import { atom, useAtomValue, useSetAtom } from 'jotai'

const messageAtom = atom<string>('')

export const useMessageValue = (): string => useAtomValue(messageAtom)

interface MessageActions {
  setMessage: (s: string) => void
}
export const useMessageActions = (): MessageActions => {
  const setMessage = useSetAtom(messageAtom)
  return {
    setMessage: (message) => setMessage(message)
  }
}
