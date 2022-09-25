import Game from '../model'
import createBlankBoard from './createBlankBoard'
import { IDatabaseOutput } from '../../interfaces'

export interface ICreateGame {
  playerX: string
  playerO: string
}

/**
 * Creates a new Side-Stacker game instance
 * @param playerX - Name of the player with the X pieces
 * @param playerO - Name of the player with the O pieces
 * @returns {Game} - New game instance
 */
const createGame = async ({ playerX, playerO }: ICreateGame): Promise<IDatabaseOutput<Game>> => {
  const board = createBlankBoard()
  const data = await new Game({
    player_x: playerX,
    player_o: playerO,
    board,
    move_history: [],
    current_player: playerX
  }).save()
  return { data }
}

export default createGame
