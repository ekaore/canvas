import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface TextItem {
  id: string;
  x: number;
  y: number;
  text: string;
  fontSize: number;                       // Размер шрифта
  fontWeight: "normal" | "bold";          // Жирность
  selected?: boolean;                     // Активен ли элемент
}

interface TextState {
  items: TextItem[];
}

const initialState: TextState = { items: [] };

const textSlice = createSlice({
  name: "text",
  initialState,
  reducers: {
    // Добавление нового текстового элемента с дефолтными параметрами
    addText: (
      state,
      action: PayloadAction<Omit<TextItem, "fontSize" | "fontWeight" | "textAlign">>
    ) => {
      state.items.push({
        ...action.payload,
        fontSize: 16,
        fontWeight: "normal",
        selected: false,
      });
    },

    // Обновление свойств существующего текста (позиция, шрифт, выравнивание)
    updateText: (
      state,
      action: PayloadAction<Partial<TextItem> & { id: string }>
    ) => {
      const item = state.items.find((t) => t.id === action.payload.id);
      if (item) Object.assign(item, action.payload);
    },

    // Выбор активного текстового элемента
    selectText: (state, action: PayloadAction<string | null>) => {
      state.items.forEach((t) => (t.selected = t.id === action.payload));
    },

    // Очистка всех текстов
    clearTexts: (state) => {
      state.items = [];
    },
  },
});

export const { addText, updateText, selectText, clearTexts } = textSlice.actions;
export default textSlice.reducer;