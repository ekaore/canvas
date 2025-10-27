import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Coupling } from "../../types/model.types";

interface EditorSchemaState {
  couplings: Coupling[];            // массив всех муфт на схеме
  scale: number;                    // масштаб (зум)
  offset: { x: number; y: number }; // смещение
  cursor: { x: number; y: number }; // координаты курсора
  zoom: number;                     // текущий уровень зума
}

// --- Начальное состояние ---
const initialState: EditorSchemaState = {
  couplings: [],
  scale: 1,
  offset: { x: 0, y: 0 },
  cursor: { x: 0, y: 0 },
  zoom: 1,
};

// --- Slice ---
export const schemaReducer = createSlice({
  name: "editorSchema",
  initialState,
  reducers: {
    // Установка массива муфт
    setCouplings(state, action: PayloadAction<Coupling[]>) {
      state.couplings = action.payload;
    },

    // Масштабирование схемы
    setScale(state, action: PayloadAction<number>) {
      state.scale = action.payload;
    },

    // Смещение схемы
    setOffset(state, action: PayloadAction<{ x: number; y: number }>) {
      state.offset = action.payload;
    },

    // Координаты курсора
    setCursor(state, action: PayloadAction<{ x: number; y: number }>) {
      state.cursor = action.payload;
    },

    // екущий зум
    setZoom(state, action: PayloadAction<number>) {
      state.zoom = action.payload;
    },
  },
});

// Экспорт
export const { setCouplings, setScale, setOffset, setCursor, setZoom } =
  schemaReducer.actions;

export default schemaReducer.reducer;
