/**
 * Output interface for different methods for the Side-Stacker game
 */
export interface GameOutput {
  type: string
  payload: {
    player: string
    board: string[][]
  }
}
