import { baseApi } from "../../../shared/lib/baseApi";
import type { IUser, IUserLog, IUserReg, IUserResponse, IUserUpdate } from "../model/users-type";


export const usersApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    register: build.mutation<IUserResponse, IUserReg>({
      query: (user) => ({
        url: "auth/register",
        method: "POST",
        body: user
      }),
      invalidatesTags: ["Users"]
    }),
    login: build.mutation<IUserResponse, IUserLog>({
      query: (user) => ({
        url: "auth/login",
        method: "POST",
        body: user
      }),
      invalidatesTags: ["Users"]
    }),
    usersMe: build.query<IUser, void>({
      query: () => "users/me",
      providesTags: ["Users"]
    }),
    updateMe: build.mutation<IUser, IUserUpdate>({
      query: (user) => ({
        url: 'users/me',
        method: "PATCH",
        body: user
      }),
      invalidatesTags: ["Users"]
    }),
  })
})

export const { useLoginMutation, useRegisterMutation, useUsersMeQuery, useUpdateMeMutation } = usersApi