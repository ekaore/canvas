import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Coupling } from "../../types/model.types";
import { CouplingState } from "./couplingSlice.types";

const initialState: CouplingState = {
  couplings: [],
  activeCouplingId: null,
  loading: false,
  error: null,
};

const couplingsSlice = createSlice({
  name: "couplings",
  initialState,
  reducers: {
    addCoupling: (state, action: PayloadAction<Coupling>) => {
      state.couplings.push(action.payload);
    },
    updateCoupling: (state, action: PayloadAction<Coupling>) => {
      const index = state.couplings.findIndex(
        (c) => c.id === action.payload.id
      );
      if (index !== -1) {
        state.couplings[index] = action.payload;
      }
    },
    updateCouplingPosition: (
      state,
      action: PayloadAction<{ id: string; x: number; y: number }>
    ) => {
      const c = state.couplings.find((c) => c.id === action.payload.id);
      if (c) {
        c.position = { x: action.payload.x, y: action.payload.y };
      }
    },
    removeCoupling: (state, action: PayloadAction<string>) => {
      state.couplings = state.couplings.filter((c) => c.id !== action.payload);
    },
    setActiveCoupling: (state, action: PayloadAction<string | null>) => {
      state.activeCouplingId = action.payload;
    },
    setCouplings: (state, action: PayloadAction<Coupling[]>) => {
      state.couplings = action.payload;
    },
    clearCouplings: (state) => {
      state.couplings = [];
      state.activeCouplingId = null;
    },
  },
});

export const {
  addCoupling,
  updateCoupling,
  updateCouplingPosition,
  removeCoupling,
  setActiveCoupling,
  setCouplings,
  clearCouplings,
} = couplingsSlice.actions;

export default couplingsSlice.reducer;
