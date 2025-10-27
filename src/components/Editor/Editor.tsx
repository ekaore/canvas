import React from "react";
import { Box } from "@mui/material";
import { EditorDrawer } from "./EditorDrawer/EditorDrawer";
import { EditorSchema } from "./EditorSchema/EditorSchema";
import { EditorButton } from "./EditorTools/EditorButton/EditorButton";
import { EditorStatusBar } from "./EditorStatusbar/EditorStatusBar";

export const Editor = () => {

  return (
    <Box sx={{ width: '100vw', height: '100vh', position: 'relative' }}>
      <EditorDrawer />
      <EditorButton />
      <EditorSchema/>
      <EditorStatusBar/>
    </Box>
  );
};
