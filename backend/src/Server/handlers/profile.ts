import { Socket } from 'socket.io'
import getUserInfo from '../../Database/User/controller/getUserInfo'
import { Events } from '../../enums'

const profile = (socket: Socket) => async (username: string) => {
  const { data } = await getUserInfo({ username })
  if (data) socket.emit(Events.Profile, data)
}

export default profile
