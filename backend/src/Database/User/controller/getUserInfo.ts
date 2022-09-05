import { Op } from 'sequelize'
import User from '../model'
import Game from '../../Game/model'
import { DatabaseOutput, UserInfo } from '../../interfaces'

interface GetUserInfo {
  username: string
}

const getUserInfo = async ({ username }: GetUserInfo): Promise<DatabaseOutput<UserInfo>> => {
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
