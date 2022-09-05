import { atom, useAtomValue, useSetAtom } from 'jotai'

const userAtom = atom<string>('')
const isLoggedInAtom = atom<boolean>(false)

export const useUserValue = (): string => useAtomValue(userAtom)
export const useIsLoggedInValue = (): boolean => useAtomValue(isLoggedInAtom)

interface UserActions {
  login: (s: string) => void
  logout: () => void
}

export const useUserActions = (): UserActions => {
  const setUser = useSetAtom(userAtom)
  const setIsLoggedIn = useSetAtom(isLoggedInAtom)
  const login = (user): void => {
    setUser(user)
    setIsLoggedIn(true)
  }

  const logout = (): void => {
    setUser('')
    setIsLoggedIn(false)
  }

  return {
    login,
    logout
  }
}
