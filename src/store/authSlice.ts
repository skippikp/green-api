import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  user?: User;
};

type User = {
  token: string;
  idInstance: string
}

const initialState: AuthState = {
  user: undefined
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
  },
});

export const { setUser } = authSlice.actions;
