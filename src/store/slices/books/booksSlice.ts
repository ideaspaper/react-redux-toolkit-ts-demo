import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export interface IBooksState {
  books: IBook[];
  booksLoading: boolean;
  booksError: string | null;
}

export interface IBook {
  id?: number;
  title: string;
  author: string;
  image_url: string;
  synopsis: string;
  price: number;
}

export const fetchBooks = createAsyncThunk<
  IBook[],
  void,
  { rejectValue: string }
>('FETCH_BOOKS', (_, { rejectWithValue }) => {
  return fetch('http://localhost:8080/books')
    .then((response) => {
      if (!response.ok) throw new Error('failed to fetch books');
      return response.json();
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      return rejectWithValue(error.message);
    });
});

export const addBook = createAsyncThunk<IBook, IBook, { rejectValue: string }>(
  'book/add',
  (book, { rejectWithValue }) => {
    return fetch(`http://localhost:8080/books`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(book),
    })
      .then((response) => {
        if (!response.ok) throw new Error('failed to add book');
        return response.json();
      })
      .then((data) => {
        return data;
      })
      .catch((error) => {
        return rejectWithValue(error.message);
      });
  },
);

export const deleteBook = createAsyncThunk<IBook, number>(
  'book/delete',
  (bookId, { rejectWithValue }) => {
    return fetch(`http://localhost:8080/books/${bookId}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (!response.ok) throw new Error('failed to delete book');
        return response.json();
      })
      .then((data) => {
        return data;
      })
      .catch((error) => {
        return rejectWithValue(error.message);
      });
  },
);

const initialState: IBooksState = {
  books: [],
  booksLoading: false,
  booksError: null,
};

export const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchBooks.fulfilled, (state, { payload }) => {
      return { ...state, books: payload, booksLoading: false };
    });
    builder.addCase(fetchBooks.pending, (state) => {
      return { ...state, booksError: null, booksLoading: true };
    });
    builder.addCase(fetchBooks.rejected, (state, { payload }) => {
      return payload
        ? { ...state, booksError: payload, booksLoading: false }
        : { ...state, booksError: 'unknown error', booksLoading: false };
    });
  },
});

export default booksSlice.reducer;
export type BooksDispatch = ThunkDispatch<IBooksState, any, AnyAction>;
