// src/components/Editor/EditorTitle/EditorTextToolbar.tsx
import React from "react";
import {
  Box,
  Select,
  MenuItem,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatAlignLeftIcon from "@mui/icons-material/FormatAlignLeft";
import FormatAlignCenterIcon from "@mui/icons-material/FormatAlignCenter";
import FormatAlignRightIcon from "@mui/icons-material/FormatAlignRight";
import { useAppDispatch } from "../../../../app/hook";
import { updateText } from "./EditorTextSlice";

interface Props {
  id: string;
  fontSize: number;
  fontWeight: "normal" | "bold";
}

export const EditorTextToolbar: React.FC<Props> = ({
  id,
  fontSize,
  fontWeight,
}) => {
  const dispatch = useAppDispatch();

  return (
    <Box display="flex" alignItems="center" gap={1} mb={2}>
      {/* Выбор размера текста */}
      <Select
        value={fontSize}
        onChange={(e) =>
          dispatch(updateText({ id, fontSize: Number(e.target.value) }))
        }
        size="small"
        sx={{ minWidth: 70 }}
      >
        {[12, 14, 16, 18, 24, 32].map((size) => (
          <MenuItem key={size} value={size}>
            {size}px
          </MenuItem>
        ))}
      </Select>
      
      {/* Кнопка жирного текста */}
      <ToggleButton
        value="bold"
        selected={fontWeight === "bold"}
        onChange={() =>
          dispatch(
            updateText({
              id,
              fontWeight: fontWeight === "bold" ? "normal" : "bold",
            })
          )
        }
        size="small"
        color="primary"
        title="Жирный текст"
      >
        <FormatBoldIcon />
      </ToggleButton>
    </Box>
  );
};