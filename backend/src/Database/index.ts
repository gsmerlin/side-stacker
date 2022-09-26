import { Sequelize } from 'sequelize-typescript'
import path from 'path'
import User from './User/model'
import Game from './Game/model'

let db: Sequelize | null = null

const start = async (storage?: string): Promise<Sequelize> => {
  if (db) return db
  db = await new Sequelize({
    database: 'Side-Stacker',
    dialect: 'sqlite',
    storage: storage ?? path.resolve(`${__dirname}/side-stacker.db`),
    models: [User, Game],
    logging: false
  })
  await db.sync()
  return db
}

export default {
  start,
  instance: db
}
