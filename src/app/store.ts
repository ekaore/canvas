import { configureStore } from "@reduxjs/toolkit";
import couplingReducer from '../entities/canvas/couplingSlice'
import schemaReducer from '../entities/canvas/schemaSlice'


export const store = configureStore({
  reducer: {
    coupling: couplingReducer, 
    editorSchema: schemaReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;