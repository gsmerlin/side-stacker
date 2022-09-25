import bcrypt from 'bcrypt'
import User from '../model'
import { IDatabaseOutput } from '../../interfaces'
import { Errors } from '../../../enums'

interface ICreateUser {
  username: string
  rawPassword: string
}

/**
 * Creates a new user in the Users database
 * @param username - Username to create
 * @param rawPassword - Raw password to encrypt (Slow hash with bcrypt and 10 salts)
 * @returns {User} - New user instance, if creation is successful
 */
const createUser = async ({ username, rawPassword }: ICreateUser): Promise<IDatabaseOutput<User>> => {
  const userAlreadyExists = await User.findOne({ where: { username } })
  if (userAlreadyExists) return { error: new Error(Errors.User.AlreadyExists) }
  const password = await bcrypt.hash(rawPassword, 10)
  const data = await new User({ username, password }).save()
  return { data }
}

export default createUser
