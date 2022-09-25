import { io, Socket } from 'socket.io-client'
import { atom } from 'jotai'

export const socket = io('http://localhost:4000')
export const websocketAtom = atom<Socket>(socket)
