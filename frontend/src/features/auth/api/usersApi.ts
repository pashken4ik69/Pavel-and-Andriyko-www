import { baseApi } from "../../../shared/lib/baseApi";
import type { IUserLog, IUserReg, IUserResponse } from "../model/users-type";


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
  })
})

export const { useLoginMutation, useRegisterMutation } = usersApi