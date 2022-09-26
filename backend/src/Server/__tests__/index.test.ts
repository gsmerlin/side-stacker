import { createServer } from 'http'
import { Server } from 'socket.io'
import Client from 'socket.io-client'
import { AddressInfo } from 'net'
import Database from '../../Database'
import path from 'path'
import { Errors, Events } from '../../enums'
import login from '../handlers/login'
import createUser from '../../Database/User/controller/createUser'

// jest.setTimeout(60000) // Increasing timeout for async tests

describe('Server tests', () => {
  let io, server, client, db

  beforeAll((done) => {
    const httpServer = createServer()
    io = new Server(httpServer)
    httpServer.listen(() => {
      const port = (httpServer.address() as AddressInfo).port
      client = Client(`http://localhost:${port}`)
      io.on('connection', (socket) => {
        server = socket
      })
      client.on('connect', () => {
        void Database.start(path.resolve(`${__dirname}/test.db`)).then((instance) => {
          db = instance
          // Instance DB tables
          db.sync()
          done()
        })
      })
    })
  })

  afterAll(() => {
    // Delete all tables after tests
    db.drop()
    io.close()
    client.close()
  })

  describe('Login route tests', () => {
    beforeAll(() => {
      server.on(Events.Login, login(server))
    })
    it('Should successfully login an existing user', (done) => {
      // Create user in DB
      // Create random username and password
      const username = Math.random().toString(36).slice(2)
      const password = Math.random().toString(36).slice(2)
      void createUser({ username, rawPassword: password }).then(() => {
        client.on(Events.LoginSuccess, (username) => {
          expect(username).toEqual(username)
          client.off(Events.LoginSuccess) // Unsubscribes from event so other tests can run
          done()
        })

        client.emit(Events.Login, { username, password })
      })
    })

    it('Should not login a non-existing user', (done) => {
      client.on(Events.LoginFailure, ({ error }) => {
        expect(error).toEqual(Errors.User.NotFound)
        client.off(Events.LoginFailure) // Unsubscribes from event so other tests can run
        done()
      })
      client.emit(Events.Login, { username: 'fakeUser', password: '123' })
    })

    it('Should not login a user when the wrong password is provided', (done) => {
      // Create user in DB
      // Create random username and password
      const username = Math.random().toString(36).slice(2)
      const password = 'some password'

      void createUser({ username, rawPassword: password })
        .then(() => {
          client.on(Events.LoginFailure, ({ error }) => {
            expect(error).toEqual(Errors.User.WrongPassword)
            client.off(Events.LoginFailure) // Unsubscribes from event so other tests can run
            done()
          })

          client.emit(Events.Login, { username, password: 'wrong password' })
        })
    })
  })
})
