import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Coupling } from "../../types/model.types"; // Импорт типа Coupling
import { CouplingGroup, CouplingState } from "./couplingSlice.types"; // Импорт типа состояния CouplingState
import { v4 as uuidv4 } from "uuid";

// Начальное состояние слайса
const initialState: CouplingState = {
  couplings: [], // Список всех "couplings"
  activeCouplingId: null, // ID активного "coupling", если выбран
  loading: false, // Флаг загрузки (пока не используется)s
  error: null, //ошибка
  groups: [], //массив всех массивов муфт
  activeGroupId: null, //какая группа выбрана
};

// Создаем slice с именем "couplings"
const couplingsSlice = createSlice({
  name: "couplings",
  initialState,
  reducers: {
    addGroupWithCouplings: (state, action: PayloadAction<{ name: string, couplings: Coupling[] }>) => {
      const newGroup: CouplingGroup = {
        id: uuidv4(),
        name: action.payload.name,
        couplings: action.payload.couplings,
      };
      state.groups.push(newGroup);
      // state.activeGroupId = newGroup.id;
    },  
    setGroups: (state, action: PayloadAction<CouplingGroup[]>) => {
      state.groups = action.payload;
    },
    // Выбрать активную группу
    setActiveGroup: (state, action: PayloadAction<string | null>) => {
      state.activeGroupId = action.payload;
    },
    // Удалить группу по id
    removeGroup: (state, action: PayloadAction<string>) => {
      state.groups = state.groups.filter((g) => g.id !== action.payload);
      if (state.activeGroupId === action.payload) {
        state.activeGroupId = null;
      }
    },
    // Очистить все группы
    clearGroups: (state) => {
      state.groups = [];
      state.activeGroupId = null;
    },
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
  },
});

// Экспортируем действия (action creators) для использования в компонентах
export const {
  addGroupWithCouplings,
  setActiveGroup,
  setGroups,
  removeGroup,
  clearGroups,
  addCoupling,
  updateCoupling,
  updateCouplingPosition,
  removeCoupling,
  setActiveCoupling,
  setCouplings,
} = couplingsSlice.actions;

// Экспортируем редьюсер для добавления в store
export default couplingsSlice.reducer;
