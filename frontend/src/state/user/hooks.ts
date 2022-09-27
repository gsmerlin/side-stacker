import { IUserActions, IUserInfo } from './interfaces'
import { useAtomValue, useSetAtom } from 'jotai'
import { INITIAL_USER, isLoggedInAtom, userAtom } from './atoms'

export const useUserValue = (): IUserInfo => useAtomValue(userAtom)
export const useIsLoggedInValue = (): boolean => useAtomValue(isLoggedInAtom)
export const useUserActions = (): IUserActions => {
  const setUser = useSetAtom(userAtom)
  const setIsLoggedIn = useSetAtom(isLoggedInAtom)
  const login = (user): void => {
    setUser(user)
    setIsLoggedIn(true)
  }

  const signup = (username: string): void => {
    setUser({ ...INITIAL_USER, username })
    setIsLoggedIn(true)
  }

  const updateUser = (user: IUserInfo): void => setUser(user)

  const logout = (): void => {
    setUser(INITIAL_USER)
    setIsLoggedIn(false)
  }

  return {
    login,
    signup,
    updateUser,
    logout
  }
}
