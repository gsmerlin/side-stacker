import { atom } from 'jotai'

export const userAtom = atom<string>('')
export const isLoggedInAtom = atom<boolean>(false)
