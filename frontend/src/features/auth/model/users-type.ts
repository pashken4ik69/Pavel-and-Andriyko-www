export interface IUser {
  id: number
  email: string
  name: string
  role: 'guest' | 'client' | 'manager'
  isActive: boolean
  password: string
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

export interface IUserUpdate {
  email: string
  name: string
  password?: string
}