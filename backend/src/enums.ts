export enum Events {
  Connection = 'connection',
  Signup = 'signup',
  SignupSuccess = 'signup success',
  SignupFailure = 'signup failure',
  Login = 'login',
  LoginSuccess = 'login success',
  LoginFailure = 'login failure',
  FindGame = 'find game',
  Turn = 'turn',
  Replay = 'replay',
  Move = 'move',
  Error = 'error',
}

export const Errors = {
  User: {
    AlreadyExists: 'User already exists!',
    NotFound: 'User not found!',
    WrongPassword: 'Wrong password!'
  },
  Game: {
    NotFound: 'Game not found!'
  }
}
