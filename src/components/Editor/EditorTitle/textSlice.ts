import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface TextItem {
  id: string;
  x: number;
  y: number;
  text: string;
}

interface TextState {
  items: TextItem[];
}

const initialState: TextState = {
  items: [],
};

const textSlice = createSlice({
  name: "text",
  initialState,
  reducers: {
    addText: (state, action: PayloadAction<TextItem>) => {
      state.items.push(action.payload);
    },
    updateText: (
      state,
      action: PayloadAction<{ id: string; text: string; x?: number; y?: number }>
    ) => {
      const item = state.items.find((t) => t.id === action.payload.id);
      if (item) {
        item.text = action.payload.text;
        if (action.payload.x !== undefined) item.x = action.payload.x;
        if (action.payload.y !== undefined) item.y = action.payload.y;
      }
    },
    clearTexts: (state) => {
      state.items = [];
    },
  },
});

export const { addText, updateText, clearTexts } = textSlice.actions;
export default textSlice.reducer;