import { IDatabaseOutput } from '../../interfaces'
import User from '../model'

interface FindUser {
  username: string
}

/**
 * Finds user based on username
 * @param username - Username to look for
 * @returns {User} - If user is found, else null
 */
const findUser = async ({ username }: FindUser): Promise<IDatabaseOutput<User>> => ({
  data: await User.findOne({ where: { username } })
})

export default findUser
