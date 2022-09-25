/**
 * Interface containing the output for the user controllers.
 * Will either return user information on success, or
 * an error object on failure.
 *
 * We're using this pattern as a copy of a typical golang pattern for returning errors
 * where all functions return a tuple "result, error"
 */
export type IDatabaseOutput<T> = IOutputSuccess<T> | IOutputError

export interface IUserInfo {
  username: string
  joined: Date
  gamesPlayed: number
  gamesWon: number
}

interface IOutputSuccess<T> {
  data: T | null
  error?: never
}

interface IOutputError {
  data?: never
  error: Error
}

/**
 * Expected model for the Side-Stacker game
 */
export interface IGameModel {
  player_x: string
  player_o: string
  board: string[][]
  move_history: string[]
  winner: string
  current_player: string
}
