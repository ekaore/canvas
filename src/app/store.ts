import { configureStore } from "@reduxjs/toolkit";
import couplingReducer from "../entities/canvas/couplingSlice";
import schemaReducer from "../entities/canvas/schemaSlice";
import textReducer from "../components/Editor/EditorTitle/textSlice";

export const store = configureStore({
  reducer: {
    coupling: couplingReducer,
    editorSchema: schemaReducer,
    text: textReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;