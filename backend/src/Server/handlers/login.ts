import userController from '../../Database/User'
import { Socket } from 'socket.io'
import { Errors, Events } from '../../enums'

export interface ILogin {
  username: string
  password: string
}

/**
 * Higher-order function that returns a handler for logging a user in.
 */
const login = (socket: Socket) =>
  async ({ username, password: rawPassword }: ILogin) => {
    const { data: user, error } = await userController.authenticateUser({ username, rawPassword })
    if (error) return socket.emit(Events.LoginFailure, { error: error.message })
    if (!user) return socket.emit(Events.LoginFailure, { error: new Error(Errors.User.NotFound) })
    return socket.emit(Events.LoginSuccess, user)
  }

export default login
