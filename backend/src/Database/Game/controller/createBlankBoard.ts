/**
 * Creates a new blank board for the side-stacker game
 */
const createBlankBoard = (): string[][] => Array(7)
  .fill('')
  .map(() => Array(7).fill(''))

export default createBlankBoard
