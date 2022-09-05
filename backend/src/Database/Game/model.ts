import {
  Column, CreatedAt, DataType, ForeignKey, Model, Table, UpdatedAt
} from 'sequelize-typescript'
import User from '../User/model'
import Index from './helpers/Validate'
import { DatabaseOutput } from '../interfaces'

interface GameOutput {
  type: string
  payload: {
    player: string
    board: string[][]
  }
}

@Table
class Game extends Model {
  @ForeignKey(() => User)
  @Column(DataType.TEXT)
    player_x: string

  @ForeignKey(() => User)
  @Column(DataType.TEXT)
    player_o: string

  @Column(DataType.ARRAY(DataType.ARRAY(DataType.TEXT)))
    board: string[][]

  @Column(DataType.ARRAY(DataType.TEXT))
    move_history: string[]

  @ForeignKey(() => User)
  @Column(DataType.TEXT)
    winner: string

  @ForeignKey(() => User)
  @Column(DataType.TEXT)
    current_player: string

  @UpdatedAt
    updatedAt: Date

  @CreatedAt
    createdAt: Date

  reversePlayer = (): void => {
    this.current_player = this.current_player === this.player_o ? this.player_x : this.player_o
  }

  getSymbol = (): string => (this.current_player === this.player_x ? 'x' : 'o')

  checkPieceWon = async (row: number, column: number): Promise<DatabaseOutput<GameOutput>> => {
    const validator = new Index(row, column, this.board, this.getSymbol())
    for (let i = 1; i < 4; i += 1) {
      validator.validate('right', i)
      validator.validate('left', i)
      validator.validate('up', i)
      validator.validate('down', i)
      validator.validate('upRight', i)
      validator.validate('downRight', i)
      validator.validate('upLeft', i)
      validator.validate('downLeft', i)
    }
    const directions = {
      horizontal: validator.counters.left + validator.counters.right,
      vertical: validator.counters.up + validator.counters.down,
      firstDiagonal: validator.counters.upRight + validator.counters.downLeft,
      secondDiagonal: validator.counters.upLeft + validator.counters.downRight
    }
    if (Object.values(directions).some((val) => val >= 3)) {
      this.winner = this.current_player
      await this.save({ fields: ['current_player', 'winner', 'board', 'move_history'] })
      return {
        data: {
          type: 'victory',
          payload: {
            player: this.current_player,
            board: this.board
          }
        }
      }
    }
    this.reversePlayer()
    await this.save({ fields: ['current_player', 'board', 'move_history'] })
    return {
      data: {
        type: 'turn',
        payload: {
          player: this.current_player,
          board: this.board
        }
      }
    }
  }

  dropPiece = async (row: number, side: string): Promise<DatabaseOutput<GameOutput>> => {
    const line = this.board[row]
    if (side === 'R') line.reverse()
    const openIndex = line.findIndex((move) => move === '')
    if (openIndex === -1) {
      return {
        data: {
          type: 'invalid move',
          payload: {
            player:
                this.current_player,
            board: this.board
          }
        }
      }
    }
    line[openIndex] = this.getSymbol()
    if (side === 'R') line.reverse()
    this.move_history = [...this.move_history, `${row},${side}`]
    const column = side === 'L' ? openIndex : line.length - (openIndex + 1)
    return await this.checkPieceWon(row, column)
  }
}

export default Game
