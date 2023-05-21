import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ChatState {
  chatId?: string;
};

const initialState: ChatState = {
  chatId: undefined,
};

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setChatId: (state, action: PayloadAction<string>) => {
      state.chatId = action.payload + '@c.us';
    },
  },
});

export const { setChatId } = chatSlice.actions;