import { configureStore } from '@reduxjs/toolkit'
// Or from '@reduxjs/toolkit/query/react'
import { setupListeners } from '@reduxjs/toolkit/query'
import { UsersApi } from './services/rtk/UserApi';


import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";



export const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    [UsersApi.reducerPath]: UsersApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(UsersApi.middleware),
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.


  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware().concat(UsersApi.middleware),
})

export let persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch)