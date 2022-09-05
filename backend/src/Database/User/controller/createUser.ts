import bcrypt from 'bcrypt'
import User from '../model'
import { DatabaseOutput } from '../../interfaces'

interface CreateUser {
  username: string
  rawPassword: string
}

const createUser = async ({ username, rawPassword }: CreateUser): Promise<DatabaseOutput<User>> => {
  const userAlreadyExists = await User.findOne({ where: { username } })
  if (userAlreadyExists) return { error: new Error('User already exists!') }
  const password = await bcrypt.hash(rawPassword, 10)
  const data = await new User({ username, password }).save()
  return { data }
}

export default createUser
