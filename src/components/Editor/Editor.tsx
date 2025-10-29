import React from "react";
import { EditorDrawer } from "./EditorDrawer/EditorDrawer";
import { EditorSchema } from "./EditorSchema/EditorSchema";
import { EditorStatusBar } from "./EditorStatusbar/EditorStatusBar";
import { TextSettingsPanel } from "./EditorTitle/EditorText/EditorTextSettingsPanel";

export const Editor = () => {
  return (
    <>
      <EditorDrawer />
      <TextSettingsPanel />
      <EditorSchema />
      {/* <EditorStatusBar /> */}
      </>
  );
};
