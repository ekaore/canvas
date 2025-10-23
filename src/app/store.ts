import { configureStore } from "@reduxjs/toolkit";
import couplingReducer from '../entities/canvas/couplingSlice'


export const store = configureStore({
  reducer: {
    coupling: couplingReducer, 
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;