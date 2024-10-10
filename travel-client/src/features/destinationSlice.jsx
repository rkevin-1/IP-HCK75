// features/destinationSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  destinations: [],
  selectedDestination: null,
  reviews: [],
};

const destinationSlice = createSlice({
  name: 'destination',
  initialState,
  reducers: {
    setDestinations: (state, action) => {
      state.destinations = action.payload;
    },
    selectDestination: (state, action) => {
      state.selectedDestination = action.payload;
    },
    setReviews: (state, action) => {
      state.reviews = action.payload;
    },
  },
});

export const { setDestinations, selectDestination, setReviews } = destinationSlice.actions;
export default destinationSlice.reducer;
