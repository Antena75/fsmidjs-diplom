import { configureStore } from '@reduxjs/toolkit';
import librariesReducer from './slices/librariesSlice';
import booksReducer from './slices/booksSlice';
import userReducer from './slices/userSlice';
import usersReducer from './slices/usersSlice';
import socketIOReducer from './slices/socketSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    libraries: librariesReducer,
    books: booksReducer,
    users: usersReducer,
    socketIO: socketIOReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store;
