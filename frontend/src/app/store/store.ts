import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "../../shared/lib/baseApi";
import { useDispatch, useSelector } from "react-redux";
import authReducer from "../../features/auth/model/userSlice"
import sapcesReducers from "../../entities/spaces/models/spces-slice"

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    auth: authReducer,
    sapces: sapcesReducers
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(baseApi.middleware)
})

type AppDispatch = typeof store.dispatch
type RootState = ReturnType<typeof store.getState>

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()