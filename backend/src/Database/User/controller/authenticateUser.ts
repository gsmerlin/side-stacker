import bcrypt from 'bcrypt'
import { IDatabaseOutput, IUserInfo } from '../../interfaces'
import User from '../model'
import { Errors } from '../../../enums'
import getUserInfo from './getUserInfo'

interface IAuthenticateUser {
  username: string
  rawPassword: string
}

/**
 * Logs user into the side-stacker game
 * @param username - Username to log in
 * @param rawPassword - Raw password string to match against encrypted password
 * @returns {User} - When found, otherwise returns an error
 */
const authenticateUser = async ({
  username,
  rawPassword
}: IAuthenticateUser): Promise<IDatabaseOutput<IUserInfo>> => {
  const data = await User.findOne({ where: { username } })
  if (!data) return { error: new Error(Errors.User.NotFound) }
  if (!await bcrypt.compare(rawPassword, data.password)) return { error: new Error(Errors.User.WrongPassword) }
  const { data: userInfo, error } = await getUserInfo({ username })
  if (error) return { error }
  return { data: userInfo }
}

export default authenticateUser
