import React from "react";
import { Box, Button } from "@mui/material";
import { useAppDispatch } from "../../../app/hook";
import { addText } from "./textSlice";

export const EditorTitle = () => {
  const dispatch = useAppDispatch();

  const handleAddText = () => {
    const newText = {
      id: Date.now().toString(),
      x: Math.random() * 800 + 100, // случайная позиция
      y: Math.random() * 400 + 100,
      text: "Новый текст",
    };
    dispatch(addText(newText));
  };

  return (
    <Box display="flex" justifyContent="flex-start" mb={2}>
      <Button
        variant="contained"
        color="primary"
        onClick={handleAddText}
        style={{ marginTop: "10px" }}
      >
        Добавить текст
      </Button>
    </Box>
  );
};
