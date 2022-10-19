import { configureStore } from '@reduxjs/toolkit';
import counterSlice from './counterSlice';
import { pokemonApi } from './pokemoApi';

export const store = configureStore({
  reducer: {
    [counterSlice.name]: counterSlice.reducer,
    [pokemonApi.reducerPath]: pokemonApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      pokemonApi.middleware
      // add more this
    ),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
