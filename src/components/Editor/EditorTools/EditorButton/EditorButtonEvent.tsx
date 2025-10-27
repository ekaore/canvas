import { Box, Button, TextField, Stack } from "@mui/material";
import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../app/hook";
import { Coupling } from "../../../../types/model.types";
import { v4 as uuidv4 } from "uuid";
import { addGroupWithCouplings } from "../../../../entities/canvas/couplingSlice";

export const EditorButtonEvent = () => {
  const [value, setValue] = useState<number | string>("");
  const presets = [2, 4, 6, 8, 10, 12, 14, 16, 32, 48];
  const dispatch = useAppDispatch();
  const couplings = useAppSelector((state) => state.coupling.groups);

  const handlePresetClick = (num: number) => {
    setValue(num);
  };

  const handleAddCoupling = () => {
    const count = Number(value);
    if (!count || count <= 0) return;
  
    const startIndex = 1;
    const newCouplings: Coupling[] = [];
  
    for (let i = 0; i < count; i++) {
      const index = startIndex + i;
      const newCoupling: Coupling = {
        id: uuidv4(),
        name: `муфта ${index}`,
        position: { x: 100 + index * 100, y: 700 },
        type: index % 2 === 0 ? "right" : "left",
        connections: [],
      };
      newCouplings.push(newCoupling);
    }
  
    // Сохраняем массив муфт как новую группу
    dispatch(
      addGroupWithCouplings({
        name: `Группа ${couplings.length + 1}`,
        couplings: newCouplings,
      })
    );
    
  
    setValue(""); // очищаем поле
  };
  
  

  return (
    <Box display="flex" flexDirection="column" gap={2} sx={{ p: 2 }}>
      <TextField
        label="Количество муфт"
        type="number"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        fullWidth
        size="small"
      />

      <Stack direction="row" flexWrap="wrap" gap={1}>
        {presets.map((num) => (
          <Button
            key={num}
            variant="contained"
            color="primary"
            onClick={() => handlePresetClick(num)}
          >
            {num}
          </Button>
        ))}
      </Stack>

      <Button
        variant="outlined"
        color="success"
        disabled={!value}
        onClick={handleAddCoupling}
      >
        Добавить на холст
      </Button>
    </Box>
  );
};
