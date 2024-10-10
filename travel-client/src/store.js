// store.js
import { configureStore } from '@reduxjs/toolkit';
import destinationReducer from './features/destinationSlice';
import uiReducer from './features/uiSlice';

export const store = configureStore({
    reducer: {
      destination: destinationReducer,
      ui: uiReducer,
    },
  });
  
