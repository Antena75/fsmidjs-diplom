import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserData } from '../../types/interfaces';

interface UsersState {
  spin: boolean;
  offset: number,
  limit: number,
  email: string,
  name: string,
  contactPhone: string,
  list: UserData[],
}

const initialState: UsersState = {
  spin: false,
  offset: 0,
  limit: 10,
  email: '',
  name: '',
  contactPhone: '',
  list: [],
}

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsersState: (state, action: PayloadAction<Partial<UsersState>>) => {
      Object.assign(state, action.payload);
    },
  }
})

export const { setUsersState } = usersSlice.actions;

export default usersSlice.reducer;
