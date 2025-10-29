import { styled } from "@mui/material/styles";
import { Divider as MuiDivider } from "@mui/material";

export const PanelContainer = styled("div")(() => ({
  display: "grid",
  gap: "20px",
  alignItems: "center",
}));

export const Divider = styled(MuiDivider)({
  margin: "15px 0",
});

export const Label = styled("label")(() => ({
  fontSize: "14px",
  color: "#333",
  display: "flex",
  alignItems: "center",
  gap: "8px",
}));

export const NumberInput = styled("input")(() => ({
  width: "70px",
  padding: "4px 8px",
  borderRadius: "6px",
  border: "1px solid #ccc",
  fontSize: "14px",
  outline: "none",
  transition: "border-color 0.2s",
  "&:focus": {
    borderColor: "#1976d2",
  },
}));

export const ToggleButton = styled("button")<{ active?: boolean }>(
  ({ active }) => ({
    background: active ? "#1976d2" : "ccc",
    color: active ? "#fff" : "#333",
    border: "none",
    borderRadius: "6px",
    padding: "6px 10px",
    width: "90px",
    cursor: "pointer",
    fontWeight: "bold",
    transition: "all 0.2s",
    "&:hover": {
      background: active ? "#1565c0" : "bbb",
    },
  })
);
