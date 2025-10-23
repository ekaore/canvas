import React from "react";
import {
  EditorButtonBoxContainer,
  EditorButtonClick,
} from "./EditorButton.styles";
import { useAppDispatch, useAppSelector } from "../../../../app/hook";
import { Coupling } from "../../../../types/model.types";
import { addCoupling } from "../../../../entities/canvas/couplingSlice";

export const EditorButton = () => {
  const dispatch = useAppDispatch();
  const couplings = useAppSelector((state) => state.coupling.couplings);

  const handleAddCoupling = () => {
    const index = couplings.length + 1;
    const newCoupling: Coupling = {
      id: `added-${index}`,
      name: `муфта ${index}`,
      position: {
        x: 100 + index * 200,
        y: 700,
      },
      type: index % 2 === 0 ? "right" : "left",
      connections: [`${index + 1}`],
    };

    dispatch(addCoupling(newCoupling));
  };

  return (
    <EditorButtonBoxContainer>
      <EditorButtonClick
        variant="contained"
        color="primary"
        onClick={handleAddCoupling}
      >
        +
      </EditorButtonClick>
    </EditorButtonBoxContainer>
  );
};
