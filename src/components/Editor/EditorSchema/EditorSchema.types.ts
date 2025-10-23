import { Coupling } from "../../../types/model.types";

export interface CouplingSchemaProps {
  couplings: Coupling[];
  scale: number;
  setScale: React.Dispatch<React.SetStateAction<number>>;
  offset: { x: number; y: number };
}
