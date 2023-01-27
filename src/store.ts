import { launchersApi } from './services/launchers';
import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'

export const store = configureStore({
  reducer: {
    [launchersApi.reducerPath]: launchersApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(launchersApi.middleware),
})

setupListeners(store.dispatch)