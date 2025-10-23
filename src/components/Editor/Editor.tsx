import React, { useState } from "react";
import { Grid } from "@mui/material";
import { EditorDrawer } from "./EditorDrawer/EditorDrawer";
import { EditorSchema } from "./EditorSchema/EditorSchema";
import { EditorButton } from "./EditorTools/EditorButton/EditorButton";
import { Coupling } from "../../types/model.types";
import { useAppSelector } from "../../app/hook";

export const Editor = () => {
  const couplings = useAppSelector((state) => state.coupling.couplings);
  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const getNextCouplingPosition = (index: number) => ({
    x: 100 + index * 200,
    y: 700,
  });

  return (
    <Grid>
      <EditorDrawer />
      <EditorButton />
      <EditorSchema
        couplings={couplings}
        scale={scale}
        setScale={setScale}
        offset={offset}
      />
    </Grid>
  );
};
