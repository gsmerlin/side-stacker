import { atom } from 'jotai'
import { IUserInfo } from './interfaces'

export const INITIAL_USER: IUserInfo = {
  username: '',
  joined: new Date(),
  gamesPlayed: 0,
  gamesWon: 0
}
export const userAtom = atom<IUserInfo>(INITIAL_USER)
export const isLoggedInAtom = atom<boolean>(false)
