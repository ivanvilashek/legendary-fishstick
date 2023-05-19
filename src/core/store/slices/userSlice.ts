import { createSlice } from '@reduxjs/toolkit';

interface UserType {
  displayName: string | null;
  email: string | null;
  id: string | null;
}

const initialState: UserType = {
  displayName: null,
  email: null,
  id: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state.displayName = action.payload.displayName;
      state.email = action.payload.email;
      state.id = action.payload.id;
    },
    removeUser(state) {
      state.displayName = null;
      state.email = null;
      state.id = null;
    },
  },
});

export const { setUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
