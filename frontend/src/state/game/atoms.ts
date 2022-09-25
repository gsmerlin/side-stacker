import { atom } from 'jotai'
import Blank from '../../assets/blank.png'

export const blankBoard = Array(7)
  .fill('')
  .map(() => Array(7).fill(Blank))

export const boardAtom = atom<string[][]>(blankBoard)
export const turnAtom = atom<boolean>(false)
export const inGameAtom = atom<boolean>(false)
export const showReplayAtom = atom<boolean>(false)
