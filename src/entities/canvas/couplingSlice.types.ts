import { Coupling } from "../../types/model.types";

export interface CouplingGroup {//масив муфт
  id: string;
  name: string;//название группы
  couplings: Coupling[];//массив муфт, которые принадлежат этой группе.
}

export interface CouplingState {
  couplings: Coupling[]; // получается 1 массив муфт
  groups: CouplingGroup[];//массив групп, каждая группа хранит свои муфты
  activeGroupId: string | null;//какая группа сейчас выделена
  activeCouplingId: string | null; // id отдельной муфты
  loading: boolean;//загрузка(если понадобится)
  error: string | null;//ошибка (если понадобится)
}
