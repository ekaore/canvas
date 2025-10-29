import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// --- Тип одного текстового элемента ---
export interface CanvasText {
  id: string;
  text: string;
  x: number;
  y: number;
  fontSize: number;
  fontWeight: "normal" | "bold";
  color: string;
  selected?: boolean;
}

// --- Состояние редактора текста ---
interface TextState {
  items: CanvasText[];
}

const initialState: TextState = {
  items: [],
};

// --- Slice ---
const textSlice = createSlice({
  name: "text",
  initialState,
  reducers: {
    // --- Добавить текст ---
    addText: (
      state,
      action: PayloadAction<Partial<CanvasText> & { id: string }>
    ) => {
      state.items.push({
        id: action.payload.id,
        text: action.payload.text || "Новый текст",
        x: action.payload.x ?? 500,
        y: action.payload.y ?? 500,
        fontSize: action.payload.fontSize ?? 16,
        fontWeight: action.payload.fontWeight ?? "normal",
        color: action.payload.color ?? "#000000",
        selected: false,
      });
    },

    // --- Обновить свойства текста ---
    updateText: (
      state,
      action: PayloadAction<Partial<CanvasText> & { id: string }>
    ) => {
      const item = state.items.find((t) => t.id === action.payload.id);
      if (item) Object.assign(item, action.payload);
    },

    // --- Удалить текст ---
    removeText: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((t) => t.id !== action.payload);
    },

    // --- Выделить текст ---
    selectText: (state, action: PayloadAction<string | null>) => {
      state.items.forEach((t) => (t.selected = t.id === action.payload));
    },

    // --- Очистить всё ---
    clearTexts: (state) => {
      state.items = [];
    },
  },
});

export const { addText, updateText, removeText, selectText, clearTexts } =
  textSlice.actions;

export default textSlice.reducer;