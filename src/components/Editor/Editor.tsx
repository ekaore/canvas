import React, { useState } from "react";
import { Grid } from "@mui/material";
import { EditorDrawer } from "./EditorDrawer/EditorDrawer";
import { EditorSchema } from "./EditorSchema/EditorSchema";
import { EditorButton } from "./EditorTools/EditorButton/EditorButton";

export const Editor = () => {

  return (
    <Grid>
      <EditorDrawer />
      <EditorButton />
      <EditorSchema/>
    </Grid>
  );
};
