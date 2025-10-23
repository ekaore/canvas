import React from "react";
import { Typography, Button } from "@mui/material";
import {
  EditorButtonBoxContainer,
  EditorButtonClick,
} from "./EditorButton.styles";
import { CouplingDashboardProps } from "./EditorButton.types";

//будет относится к инструментам, пока находится тут!
export const EditorButton: React.FC<CouplingDashboardProps> = ({
  onAddCoupling,
}) => (
  <EditorButtonBoxContainer>
    <EditorButtonClick
      variant="contained"
      color="primary"
      onClick={onAddCoupling}
    >
      +
    </EditorButtonClick>
  </EditorButtonBoxContainer>
);
