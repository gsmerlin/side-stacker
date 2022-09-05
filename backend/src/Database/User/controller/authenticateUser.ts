import bcrypt from 'bcrypt'
import { DatabaseOutput } from '../../interfaces'
import User from '../model'

interface AuthenticateUser {
  username: string
  rawPassword: string
}

const authenticateUser = async ({
  username,
  rawPassword
}: AuthenticateUser): Promise<DatabaseOutput<User>> => {
  const data = await User.findOne({ where: { username } })
  if (!data) return { error: new Error('Username not found!') }
  if (!await bcrypt.compare(rawPassword, data.password)) return { error: new Error('Wrong password!') }
  return { data }
}

export default authenticateUser
