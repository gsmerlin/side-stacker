export enum Events {
  Signup = 'signup',
  SignupSuccess = 'signup success',
  SignupFailure = 'signup failure',
  Login = 'login',
  LoginSuccess = 'login success',
  LoginFailure = 'login failure',
  FindGame = 'find game',
  Board = 'board',
  Turn = 'turn',
  Move = 'move',
  Replay = 'replay',
  Victory = 'victory',
  Profile = 'profile',
  Timer = 'timer'
}

export const Messages = {
  Waiting: 'Waiting for opponent...',
  BlankUser: 'Username cannot be left blank!',
  BlankPassword: 'Password cannot be left blank!',
  YourTurn: 'Your turn!',
  TheirTurn: (player: string) => `${player}'s turn!`,
  Victory: (player: string) => `${player} wins!`,
  Clear: ''
}
