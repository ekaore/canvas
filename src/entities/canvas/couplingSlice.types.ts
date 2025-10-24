import { Coupling } from "../../types/model.types";

export interface CouplingState {
  couplings: Coupling[]; // Все муфты
  activeCouplingId: string | null; // Какая муфта выделена
  loading: boolean; // Если происходит загрузка/сохранение
  error: string | null; // Ошибки
}
 