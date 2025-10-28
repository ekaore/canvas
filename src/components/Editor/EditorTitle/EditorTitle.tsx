import React from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hook";
import { Box, Button, Slider, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { updateText } from "./EditorText/TextSlice";

export const EditorTitle = () => {
  const dispatch = useAppDispatch();
  const texts = useAppSelector((state) => state.text.items);
  const selected = texts[texts.length - 1];

  if (!selected) return null;

  return (
    <Box display="flex" gap={2} alignItems="center" p={2}>
      {/* Размер шрифта */}
      <Box>
        <Slider
          min={10}
          max={48}
          value={selected.fontSize}
          onChange={(_, newValue) =>
            dispatch(updateText({ id: selected.id, fontSize: newValue as number }))
          }
          valueLabelDisplay="auto"
        />
      </Box>

      {/* Жирность */}
      <ToggleButtonGroup
        value={selected.fontWeight}
        exclusive
        onChange={(_, newValue) =>
          newValue &&
          dispatch(updateText({ id: selected.id, fontWeight: newValue }))
        }
      >
        <ToggleButton value="normal">Normal</ToggleButton>
        <ToggleButton value="bold">Bold</ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
};