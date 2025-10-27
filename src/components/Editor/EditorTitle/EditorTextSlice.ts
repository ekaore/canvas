import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CanvasText {
  id: string;
  text: string;
  position: { x: number; y: number };
  fontSize: number;
  color: string;
}

interface TextState {
  texts: CanvasText[];
}

const initialState: TextState = {
  texts: [],
};

const textSlice = createSlice({
  name: "text",
  initialState,
  reducers: {
    addText(state, action: PayloadAction<CanvasText>) {
      state.texts.push(action.payload);
    },
    updateText(state, action: PayloadAction<{ id: string; text: string }>) {
      const existing = state.texts.find((t) => t.id === action.payload.id);
      if (existing) existing.text = action.payload.text;
    },
  },
});

export const { addText, updateText } = textSlice.actions;
export default textSlice.reducer;
