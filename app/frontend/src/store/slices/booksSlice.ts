import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BookData } from '../../types/interfaces';

interface BooksState {
  offset: number,
  limit: number,
  titleSearch: string,
  authorSearch: string,
  spin: boolean,
  list: BookData[],
  currentBook: BookData,
}

const initialState: BooksState = {
  offset: 0,
  limit: 3,
  titleSearch: '',
  authorSearch: '',
  spin: false,
  list: [],
  currentBook: {
    _id: '',
    library: '',
    title: '',
    author: '',
    year: '',
    description: '',
    images: [],
    isAvailable: true,
    totalCopies: '',
    availableCopies: '',
  },
}

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    setBooksState: (state, action: PayloadAction<Partial<BooksState>>) => {
      Object.assign(state, action.payload);
    },
  }
})

export const { setBooksState } = booksSlice.actions

export default booksSlice.reducer