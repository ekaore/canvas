import React from "react"
import { ContainerGrid } from "./CouplingItem.styles"
import { TextField, Typography } from "@mui/material"

interface CouplingItemProps {
  value: number;
  onChange: (newValue: number) => void;
};

export const CouplingItem = ({ value, onChange }: CouplingItemProps) => {
  return (
    <ContainerGrid>
      <Typography>{value}</Typography>
      {/* <TextField
        type="number"
        value={value.toString()} 
        onChange={(e) => onChange(Number(e.target.value))}
        variant="outlined"
        size="small"
      /> */}
      </ContainerGrid>
  )
}
