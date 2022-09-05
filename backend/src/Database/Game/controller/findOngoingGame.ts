import { FindOptions, Op } from 'sequelize'
import { DatabaseOutput } from '../../interfaces'
import Game from '../model'

interface FindOngoingGame {
  gameId?: string
  player?: string
}

const findOngoingGame = async ({
  gameId,
  player
}: FindOngoingGame): Promise<DatabaseOutput<Game>> => {
  if ((gameId == null) && (player == null)) return { error: new Error('Must provide game id or a player name!') }
  const options: FindOptions = { where: { winner: null } }
  if (gameId != null) options.where = { ...options.where, id: gameId }
  if (player != null) options.where = { ...options.where, [Op.or]: [{ player_x: player }, { player_o: player }] }
  return {
    data: await Game.findOne(options)
  }
}

export default findOngoingGame
