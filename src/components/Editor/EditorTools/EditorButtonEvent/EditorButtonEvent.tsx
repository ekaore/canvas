import { Box, Button, TextField, Stack } from "@mui/material";
import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../app/hook";
import { Coupling } from "../../../../types/model.types";
import { v4 as uuidv4 } from "uuid";
import { addGroupWithCouplings } from "../../../../entities/canvas/couplingSlice";
import { presets } from "./EditorButtonEvent.const";

export const EditorButtonEvent = () => {
  const [count, setCount] = useState<number | null>(null);     // Количество муфт
  const [startIndex, setStartIndex] = useState<number>(1);     // Стартовый номер
  const dispatch = useAppDispatch();
  const couplings = useAppSelector((state) => state.coupling.groups);

  const handlePresetClick = (num: number) => {
    setCount(num);
  };

  const hendl = () => {}

  const handleAddCoupling = () => {
    const numCount = Number(count);
    if (!numCount || numCount <= 0) return;

    const newCouplings: Coupling[] = [];

    for (let i = 0; i < numCount; i++) {
      const portNumber = startIndex + i;

      const newCoupling: Coupling = {
        id: uuidv4(),
        name: `муфта ${portNumber}`,
        title: `${portNumber}`,
        position: { x: 100 + i * 100, y: 700 },
        type: portNumber % 2 === 0 ? "right" : "left",
        connections: [],
      };
      newCouplings.push(newCoupling);
    }

    dispatch(
      addGroupWithCouplings({
        name: `${couplings.length + 1}`,
        couplings: newCouplings,
      })
    );

    setCount(null);
    setStartIndex(1)
  };

  return (
    <Box display="flex" flexDirection="column" gap={2} sx={{ p: 2 }}>
      {/* Количество муфт */}
      <TextField
        label="Количество муфт"
        type="number"
        value={count ?? ""}
        onChange={(e) => setCount(Number(e.target.value))}
        fullWidth
        size="small"
      />

      {/* Стартовый номер */}
      <TextField
        label="Стартовый номер"
        type="number"
        value={startIndex}
        onChange={(e) => setStartIndex(Number(e.target.value))}
        fullWidth
        size="small"
      />

      {/* Быстрый выбор */}
      <Stack direction="row" flexWrap="wrap" gap={1}>
        {presets.map((num) => (
          <Button
            key={num}
            variant="contained"
            color="primary"
            onClick={() => handlePresetClick(num)}
            sx={{ height: "25px" }}
          >
            {num}
          </Button>
        ))}
      </Stack>

      {/* Добавить */}
      <Button
        variant="outlined"
        disabled={!count}
        onClick={handleAddCoupling}
      >
        Добавить
      </Button>
    </Box>
  );
};
