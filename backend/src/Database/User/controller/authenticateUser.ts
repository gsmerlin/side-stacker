import bcrypt from 'bcrypt'
import { IDatabaseOutput } from '../../interfaces'
import User from '../model'
import { Errors } from '../../../enums'

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
}: IAuthenticateUser): Promise<IDatabaseOutput<User>> => {
  const data = await User.findOne({ where: { username } })
  if (!data) return { error: new Error(Errors.User.NotFound) }
  if (!await bcrypt.compare(rawPassword, data.password)) return { error: new Error(Errors.User.WrongPassword) }
  return { data }
}

export default authenticateUser
