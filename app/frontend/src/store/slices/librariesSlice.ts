import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LibraryData } from '../../types/interfaces';

interface LibrariesState {
  offset: number,
  limit: number,
  nameSearch: string,
  spin: boolean,
  list: LibraryData[],
  currentLibrary: LibraryData,
}

const initialState: LibrariesState = {
  offset: 0,
  limit: 3,
  nameSearch: '',
  spin: false,
  list: [],
  currentLibrary: {
    _id: '',
    name: '',
    address: '',
    description: '',
    images: [],
  },
}

const librariesSlice = createSlice({
  name: 'libraries',
  initialState,
  reducers: {
    setLibrariesState: (state, action: PayloadAction<Partial<LibrariesState>>) => {
      Object.assign(state, action.payload);
    },
  }
})

export const { setLibrariesState } = librariesSlice.actions

export default librariesSlice.reducer