import { createSlice } from "@reduxjs/toolkit";
import type { IUser, IUserResponse } from "./usersType";

interface AuthState {
  user: IUser | null
}

const getUserStorage = () => {
  const user = localStorage.getItem("user")
  return user ? JSON.parse(user) : null
}

const initialState: AuthState = {
  user: getUserStorage()
}

const userSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    addUser: (state, action: { payload: IUserResponse }) => {
      state.user = action.payload.user
      localStorage.setItem("user", JSON.stringify(action.payload.user))
      localStorage.setItem("accessToken", action.payload.accessToken)
      localStorage.setItem("refreshToken", action.payload.refreshToken)
    },
    clearUser: (state) => {
      state.user = null
      localStorage.clear()
    }
  }
})

export const { clearUser, addUser } = userSlice.actions
export default userSlice.reducer