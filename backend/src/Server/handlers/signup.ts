import userController from '../../Database/User'
import { Events } from '../../enums'
import { Socket } from 'socket.io'

export interface ISignup {
  username: string
  password: string
}

/**
 * Higher order function for creating a new user
 */
const signup = (socket: Socket) =>
  async ({ username, password: rawPassword }: ISignup) => {
    const { error } = await userController.createUser({ username, rawPassword })
    if (error) {
      return socket.emit(Events.SignupFailure, { error: error.message })
    }
    return socket.emit(Events.SignupSuccess, username)
  }

export default signup
