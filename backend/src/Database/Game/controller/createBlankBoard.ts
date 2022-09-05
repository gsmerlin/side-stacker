const createBlankBoard = (): string[][] => Array(7)
  .fill('')
  .map(() => Array(7).fill(''))

export default createBlankBoard
