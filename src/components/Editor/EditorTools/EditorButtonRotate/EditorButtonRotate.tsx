import { Box, Button } from "@mui/material";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../../../app/hook";
import { rotateGroup } from "../../../../entities/canvas/couplingSlice";

export const EditorButtonRotate = () => {

const { groups } = useAppSelector((state) => state.coupling);
    const dispatch = useAppDispatch();

const firstGroupId = groups[0]?.id;
  return (
    <Box>
      <Button
        variant="contained"
        color="secondary"
        onClick={() => {
            if (firstGroupId) dispatch(rotateGroup(firstGroupId));
          }}
      >
        🔄 Повернуть группу
      </Button>
    </Box>
  );
};