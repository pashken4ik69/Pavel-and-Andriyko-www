export interface IUser {
  id: number
  email: string
  name: string
  role: 'guest' | 'client' | 'manager'
  isActive: boolean
}

export interface IUserResponse {
  user: IUser
  accessToken: string
  refreshToken: string
}

export interface IUserReg {
  email: string
  name: string
  password: string
  rpassword: string
}

export interface IUserLog {
  email: string
  password: string
}