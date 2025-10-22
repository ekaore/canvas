import React, { useState } from "react"
import { Grid } from "@mui/material"
import { EditorDrawer } from "./EditorDrawer/EditorDrawer";
import { Coupling } from "./EditorSchema/EditorSchema.types";
import { EditorSchema } from "./EditorSchema/EditorSchema";
import { EditorButton } from "./EditorButton/EditorButton";

export const Editor = () => {
    const [couplings, setCouplings] = useState<Coupling[]>([]);
    const [scale, setScale] = useState(1);
    const [offset, setOffset] = useState({ x: 0, y: 0 });
  
    const getNextCouplingPosition = (index: number) => ({
      x: 100 + index * 200,
      y: 700,
    });
  
    const handleAddCoupling = () => {
      setCouplings(prev => {
        const index = prev.length + 1;
        const pos = getNextCouplingPosition(index);
        return [
          ...prev,
          {
            id: `added-${index}`,
            name: `муфта ${index}`,
            position: pos,
            type: index % 2 === 0 ? 'right' : 'left',
            connections: [index + 1],
          },
        ];
      });
    };
    return (
        <Grid
            container
            sx={{
             

            }}
        >
        <EditorDrawer/>
        <EditorButton onAddCoupling={handleAddCoupling} />
            <EditorSchema            
            couplings={couplings}
          setCouplings={setCouplings}
          scale={scale}
          setScale={setScale}
          offset={offset}/>
        </Grid>
    );
};