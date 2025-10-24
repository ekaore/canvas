import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Coupling } from "../../types/model.types";
//ДУМАЮ НУЖЕН ЛИ ОН ВООБЩЕ!!
interface EditorSchemaState {
  couplings: Coupling[];        // массив всех муфт на схеме
  scale: number;                // масштаб (зум) схемы
  offset: { x: number; y: number }; // смещение схемы (для перемещения)
}

// Начальное состояние редактора схемы
const initialState: EditorSchemaState = {
  couplings: [],                // изначально муфт нет
  scale: 1,                     // стандартный масштаб
  offset: { x: 0, y: 0 },       // схема изначально не смещена
};

// Создаём слайс Redux
export const schemaReducer = createSlice({
  name: "editorSchema",         // имя слайса
  initialState,                 // начальное состояние
  reducers: {                   // объект с редьюсерами (функциями, которые меняют состояние)
    
    // Редьюсер для установки массива муфт
    setCouplings(state, action: PayloadAction<Coupling[]>) {
      state.couplings = action.payload; // заменяем текущий массив на новый
    },
    
    // Редьюсер для изменения масштаба схемы
    setScale(state, action: PayloadAction<number>) {
      state.scale = action.payload; // задаём новый масштаб
    },
    
    // Редьюсер для изменения смещения схемы
    setOffset(state, action: PayloadAction<{ x: number; y: number }>) {
      state.offset = action.payload; // задаём новые координаты смещения
    },
  },
});

// Экспортируем созданные экшены, чтобы их можно было вызывать из компонентов
export const { setCouplings, setScale, setOffset } = schemaReducer.actions;

// Экспортируем сам редьюсер, чтобы добавить его в store
export default schemaReducer.reducer;
