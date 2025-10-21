export interface ConnectionPoint {
  id: string;
  name: string;
  position: { x: number; y: number };
  connections: {
    red1: string | null;
    red2: string | null;
    black1: string | null;
    black2: string | null;
  };
}

export interface Coupling {
  id: string;
  name: string;
  position: { x: number; y: number };
  type: 'left' | 'right';
  connections: number[];
}