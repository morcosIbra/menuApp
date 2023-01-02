import { createSlice } from '@reduxjs/toolkit';
import { users } from './constant';

const initialState = { user: users.user };

export const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = users[action.payload];
    }
  }
});

export const { setUser } = authSlice.actions;
// ? Export the authSlice.reducer to be included in the store.
export default authSlice.reducer;
