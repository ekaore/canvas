import { Coupling } from "../../types/model.types";

// export interface CouplingState {
//   activeCouplingId: string | null; // Какая муфта выделена
//   loading: boolean; // Если происходит загрузка/сохранение
//   error: string | null; // Ошибки
// }

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
