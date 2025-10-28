import React from "react";
import { Box } from "@mui/material";
import { EditorDrawer } from "./EditorDrawer/EditorDrawer";
import { EditorSchema } from "./EditorSchema/EditorSchema";
import { EditorButton } from "./EditorTools/EditorButton/EditorButton";
import { EditorStatusBar } from "./EditorStatusbar/EditorStatusBar";
import { TextSettingsPanel } from "./EditorTitle/EditorText/EditorTextSettingsPanel";

export const Editor = () => {
  return (
    <>
      <EditorDrawer />
      <TextSettingsPanel />
      <EditorSchema />
      <EditorButton />
      <EditorStatusBar />
      </>
  );
};
