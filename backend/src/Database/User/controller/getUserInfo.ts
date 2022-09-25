import { Op } from 'sequelize'
import User from '../model'
import Game from '../../Game/model'
import { IDatabaseOutput, IUserInfo } from '../../interfaces'

interface IGetUserInfo {
  username: string
}

/**
 * Returns a formatted User info for showing relevant user statistics
 * @param username - User to find values for
 * @returns {IUserInfo} - When successful, otherwise an error
 */
const getUserInfo = async ({ username }: IGetUserInfo): Promise<IDatabaseOutput<IUserInfo>> => {
  const user = await User.findOne({ where: { username } })
  if (!user) return { error: new Error('User not found!') }
  const { createdAt: joined } = user
  const games = await Game.findAll({
    where: {
      [Op.or]: [
        { player_x: username },
        { player_o: username },
        { winner: username }
      ]
    }
  })
  const gamesPlayed = games.length
  const gamesWon = games.filter((game) => game.winner === username).length
  return {
    data: {
      username,
      joined,
      gamesPlayed,
      gamesWon
    }
  }
}

export default getUserInfo
