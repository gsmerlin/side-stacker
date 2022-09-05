import Game from '../model'
import createBlankBoard from './createBlankBoard'
import { DatabaseOutput } from '../../interfaces'

interface CreateGame {
  playerX: string
  playerO: string
}

const createGame = async ({ playerX, playerO }: CreateGame): Promise<DatabaseOutput<Game>> => {
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
