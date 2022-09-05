/**
 * Interface containing the output for the user controllers.
 * Will either return user information on success, or
 * an error object on failure.
 */
export type DatabaseOutput<T> = OutputSuccess<T> | OutputError

export interface UserInfo {
  username: string
  joined: Date
  gamesPlayed: number
  gamesWon: number
}

interface OutputSuccess<T> {
  data: T | null
  error?: never
}

interface OutputError {
  data?: never
  error: Error
}
