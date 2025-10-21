import { ConnectionPoint, Coupling } from "./CouplingSchema.types";

const initialCouplings: Coupling[] = [
  {
    id: 'left',
    name: 'муфта мтаг-210',
    position: { x: 50, y: 300 },
    type: 'left',
    connections: Array.from({ length: 24 }, (_, i) => i + 1)
  },
  {
    id: 'right',
    name: 'муфта мтаг-213',
    position: { x: 600, y: 150 },
    type: 'right',
    connections: Array.from({ length: 24 }, (_, i) => i + 1)
  }
];