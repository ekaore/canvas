import { Coupling } from "../../types/model.types";

export interface CouplingGroup {
  id: string;
  name: string;
  couplings: Coupling[];
  orientation?: "horizontal" | "vertical"; // ✅ добавляем это поле
  rotation?: number;

}

export interface CouplingState {
  couplings: Coupling[];
  groups: CouplingGroup[];
  activeGroupId: string | null;
  activeCouplingId: string | null;
  loading: boolean;
  error: string | null;
  orientation: "horizontal" | "vertical"; // можно оставить, если нужно для всего состояния
}
