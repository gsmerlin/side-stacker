import { DatabaseOutput } from '../../interfaces'
import User from '../model'

interface FindUser {
  username: string
}

const findUser = async ({ username }: FindUser): Promise<DatabaseOutput<User>> => ({
  data: await User.findOne({ where: { username } })
})

export default findUser
