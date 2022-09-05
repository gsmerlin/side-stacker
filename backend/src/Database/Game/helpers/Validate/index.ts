import { CheckValue, Counters, IsValid, Validations } from './interfaces'

class Index {
  row: number

  column: number

  board: string[][]

  symbol: string

  constructor (row: number, column: number, board: string[][], symbol: string) {
    this.row = row
    this.column = column
    this.board = board
    this.symbol = symbol
  }

  isValid: IsValid = {
    right: true,
    left: true,
    up: true,
    down: true,
    upRight: true,
    upLeft: true,
    downRight: true,
    downLeft: true
  }

  counters: Counters = {
    right: 0,
    left: 0,
    up: 0,
    down: 0,
    upRight: 0,
    upLeft: 0,
    downRight: 0,
    downLeft: 0
  }

  validations: Validations = {
    right: (i: number) => this.column + i < this.board[this.row].length,
    left: (i: number) => this.column - i >= 0,
    up: (i: number) => this.row - i >= 0,
    down: (i: number) => this.row + i < this.board.length,
    upRight: (i: number) => this.validations.up(i) && this.validations.right(i),
    upLeft: (i: number) => this.validations.up(i) && this.validations.left(i),
    downRight: (i: number) => this.validations.down(i) && this.validations.right(i),
    downLeft: (i: number) => this.validations.down(i) && this.validations.left(i)
  }

  checkValue: CheckValue = {
    right: (i: number) => this.board[this.row][this.column + i] === this.symbol,
    left: (i: number) => this.board[this.row][this.column - i] === this.symbol,
    up: (i: number) => this.board[this.row - i][this.column] === this.symbol,
    down: (i: number) => this.board[this.row + i][this.column] === this.symbol,
    upRight: (i: number) => this.board[this.row - i][this.column + i] === this.symbol,
    upLeft: (i: number) => this.board[this.row - i][this.column - i] === this.symbol,
    downRight: (i: number) => this.board[this.row + i][this.column + i] === this.symbol,
    downLeft: (i: number) => this.board[this.row + i][this.column - i] === this.symbol
  }

  validate = (direction: string, i: number): void => {
    if (!this.isValid[direction]) return
    if (!this.validations[direction](i)) return
    if (this.checkValue[direction](i)) {
      this.counters[direction]++
      return
    }
    this.isValid[direction] = false
  }
}

export default Index
