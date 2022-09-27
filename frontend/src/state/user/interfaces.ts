export interface IUserActions {
  login: (user: IUserInfo) => void
  signup: (username: string) => void
  updateUser: (user: IUserInfo) => void
  logout: () => void
}

export interface IUserInfo {
  username: string
  joined: Date
  gamesPlayed: number
  gamesWon: number
}
