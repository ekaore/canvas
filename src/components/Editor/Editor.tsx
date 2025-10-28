import React from "react";
import { Box } from "@mui/material";
import { EditorDrawer } from "./EditorDrawer/EditorDrawer";
import { EditorSchema } from "./EditorSchema/EditorSchema";
import { EditorButton } from "./EditorTools/EditorButton/EditorButton";
import { EditorStatusBar } from "./EditorStatusbar/EditorStatusBar";
import { TextSettingsPanel } from "./EditorTitle/EditorText/EditorTextSettingsPanel";
// import { TextSettingsPanel } from "./EditorTitle/TextSettingsPanel";

export const Editor = () => {
  return (
    <Box sx={{ width: "100vw", height: "100vh", position: "relative" }}>
      {/* Боковая панель инструментов */}
      <EditorDrawer />

      {/* Панель настройки текста */}
      <Box sx={{ position: "absolute", top: 80, left: 280 }}>
        <TextSettingsPanel />
      </Box>

      {/* Основная область редактирования */}
      <EditorSchema />

      {/* Кнопки инструментов */}
      <EditorButton />

      {/* Нижняя статус-панель */}
      <EditorStatusBar />
    </Box>
  );
};
