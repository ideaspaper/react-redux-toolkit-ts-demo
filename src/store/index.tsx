import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './slices/counter/counterSlice';
import booksReducer from './slices/books/booksSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    books: booksReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
