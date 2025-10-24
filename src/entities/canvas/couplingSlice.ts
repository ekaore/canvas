import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Coupling } from "../../types/model.types"; // Импорт типа Coupling
import { CouplingState } from "./couplingSlice.types"; // Импорт типа состояния CouplingState

// Начальное состояние слайса
const initialState: CouplingState = {
  couplings: [], // Список всех "couplings"
  activeCouplingId: null, // ID активного "coupling", если выбран
  loading: false, // Флаг загрузки (пока не используется)
  error: null, // Для ошибок (пока не используется)
};

// Создаем slice с именем "couplings"
const couplingsSlice = createSlice({
  name: "couplings",
  initialState,
  reducers: {
    // Добавляет новый coupling в массив
    addCoupling: (state, action: PayloadAction<Coupling>) => {
      state.couplings.push(action.payload);
    },
    // Обновляет существующий coupling по ID
    updateCoupling: (state, action: PayloadAction<Coupling>) => {
      const index = state.couplings.findIndex(
        (c) => c.id === action.payload.id
      );
      if (index !== -1) {
        state.couplings[index] = action.payload;
      }
    },
    // Обновляет позицию конкретного coupling
    updateCouplingPosition: (
      state,
      action: PayloadAction<{ id: string; x: number; y: number }>
    ) => {
      const c = state.couplings.find((c) => c.id === action.payload.id);
      if (c) {
        c.position = { x: action.payload.x, y: action.payload.y };
      }
    },
    // Удаляет coupling по ID
    removeCoupling: (state, action: PayloadAction<string>) => {
      state.couplings = state.couplings.filter((c) => c.id !== action.payload);
    },
    // Устанавливает активный coupling по ID или снимает выделение (null)
    setActiveCoupling: (state, action: PayloadAction<string | null>) => {
      state.activeCouplingId = action.payload;
    },
    // Заменяет весь массив couplings новым
    setCouplings: (state, action: PayloadAction<Coupling[]>) => {
      state.couplings = action.payload;
    },
    // Очищает все couplings и снимает активный выбор
    clearCouplings: (state) => {
      state.couplings = [];
      state.activeCouplingId = null;
    },
  },
});

// Экспортируем действия (action creators) для использования в компонентах
export const {
  addCoupling,
  updateCoupling,
  updateCouplingPosition,
  removeCoupling,
  setActiveCoupling,
  setCouplings,
  clearCouplings,
} = couplingsSlice.actions;

// Экспортируем редьюсер для добавления в store
export default couplingsSlice.reducer;
