import React from "react";
import { useAppDispatch, useAppSelector } from "../../../../app/hook";
import { Box } from "@mui/material";
import { updateText } from "./EditorTextSlice";

import {
  PanelContainer,
  Label,
  NumberInput,
  ToggleButton,
} from "./EditorTextSettingsPanel.styles";

export const TextSettingsPanel = () => {
  const dispatch = useAppDispatch();
  const selected = useAppSelector((state) =>
    state.text.items.find((t) => t.selected)
  );

  if (!selected) return null;

  return (
    <PanelContainer>
      {/* Размер текста */}
      <Label>
        Размер:
        <NumberInput
          type="number"
          value={selected.fontSize}
          min={8}
          max={72}
          onChange={(e) =>
            dispatch(
              updateText({
                id: selected.id,
                fontSize: Number(e.target.value),
              })
            )
          }
        />
      </Label>

      {/* Жирность */}
      <ToggleButton
        active={selected.fontWeight === "bold"}
        onClick={() =>
          dispatch(
            updateText({
              id: selected.id,
              fontWeight:
                selected.fontWeight === "bold" ? "normal" : "bold",
            })
          )
        }
      >
        Жирный
      </ToggleButton>
    </PanelContainer>
  );
};