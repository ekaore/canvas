// src/app/store.ts
import { configureStore } from "@reduxjs/toolkit";
import couplingReducer from "../entities/canvas/couplingSlice";
import schemaReducer from "../entities/canvas/schemaSlice";
import textReducer from '../components/Editor/EditorTitle/EditorText/TextSlice';

// Конфигурация глобального Redux-хранилища
export const store = configureStore({
  reducer: {
    coupling: couplingReducer,      // Управление связями между элементами
    editorSchema: schemaReducer,    // Состояние и структура схемы
    text: textReducer,              // Текстовые элементы редактора
  },
});

// Типизация для хуков
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;