import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Viewport {
  x: number;
  y: number;
  scale: number;
}

const initialState: Viewport = {
  x: 0,
  y: 0,
  scale: 1,
};

const canvasSlice = createSlice({
  name: "canvas",
  initialState,
  reducers: {
    setViewport(state, action: PayloadAction<Viewport>) {
      state.x = action.payload.x;
      state.y = action.payload.y;
      state.scale = action.payload.scale;
    },
    moveViewport(state, action: PayloadAction<{ dx: number; dy: number }>) {
      state.x += action.payload.dx;
      state.y += action.payload.dy;
    },
    zoomViewport(state, action: PayloadAction<{ factor: number }>) {
      state.scale *= action.payload.factor;
      if (state.scale < 0.1) state.scale = 0.1;
      if (state.scale > 8) state.scale = 8;
    },
  },
});

export const { setViewport, moveViewport, zoomViewport } = canvasSlice.actions;
export default canvasSlice.reducer;