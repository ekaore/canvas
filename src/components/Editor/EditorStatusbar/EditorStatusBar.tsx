import React from "react";
import { Box, Typography } from "@mui/material";
import { useAppSelector } from "../../../app/hook";
import { RootState } from "../../../app/store";

export const EditorStatusBar = () => {
  const zoom = useAppSelector((state) => state.editorSchema.zoom); // текущий масштаб
  const cursor = useAppSelector((state) => state.editorSchema.cursor); // координаты курсора

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        width: "100%",
        height: 28,
        px: 2,
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        gap: 3,
        fontSize: 14,
      }}
    >
      <Typography variant="body2">Зум: {(zoom * 100).toFixed(0)}%</Typography>
      <Typography variant="body2">
        X: {cursor?.x?.toFixed(0) ?? 0}, Y: {cursor?.y?.toFixed(0) ?? 0}
      </Typography>
    </Box>
  );
};
