// features/uiSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isChatboxVisible: false,
  isReviewModalVisible: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleChatbox: (state) => {
      state.isChatboxVisible = !state.isChatboxVisible;
    },
    toggleReviewModal: (state) => {
      state.isReviewModalVisible = !state.isReviewModalVisible;
    },
  },
});

export const { toggleChatbox, toggleReviewModal } = uiSlice.actions;
export default uiSlice.reducer;
