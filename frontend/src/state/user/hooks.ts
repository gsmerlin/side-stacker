import { IUserActions } from './interfaces'
import { useAtomValue, useSetAtom } from 'jotai'
import { isLoggedInAtom, userAtom } from './atoms'

export const useUserValue = (): string => useAtomValue(userAtom)
export const useIsLoggedInValue = (): boolean => useAtomValue(isLoggedInAtom)
export const useUserActions = (): IUserActions => {
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
