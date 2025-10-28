export type Pos = { x: number; y: number };
export type Group = any; // заменить на твой тип

export interface IFer {
  active: boolean;
  groupId: string | null;
  startMouse: Pos | null;
  baseGroups: Group[] | null;
  rafId: number | null;
}