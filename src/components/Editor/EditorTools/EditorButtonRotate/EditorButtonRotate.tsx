import { Box, Button } from "@mui/material";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../../../app/hook";
import { rotateGroup } from "../../../../entities/canvas/couplingSlice";

export const EditorButtonRotate = () => {

    const dispatch = useAppDispatch();
    const { groups, activeGroupId } = useAppSelector((state) => state.coupling);

    const activeGroup = groups.find((g) => g.id === activeGroupId);
  return (
    <Box>
      <Button
        variant="contained"
        color="secondary"
        disabled={!activeGroup}
        onClick={() => {
          if (activeGroupId) dispatch(rotateGroup(activeGroupId));
        }}
      >
        🔄 Повернуть группу
      </Button>
    </Box>
  );
};