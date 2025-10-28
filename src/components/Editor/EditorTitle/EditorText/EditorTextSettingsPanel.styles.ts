import { styled } from "@mui/material/styles";

export const PanelContainer = styled("div")(() => ({
  display: "grid",
  gap: "20px",
  alignItems: "center",
  padding: "10px 16px",
  backgroundColor: "#f9f9f9",
  borderRadius: "12px",
  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  width: "fit-content",
}));

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
    background: active ? "#1976d2" : "transparent",
    color: active ? "#fff" : "#333",
    border: "none",
    borderRadius: "6px",
    padding: "6px 10px",
    cursor: "pointer",
    fontWeight: "bold",
    transition: "all 0.2s",
    "&:hover": {
      background: active ? "#1565c0" : "rgba(0,0,0,0.05)",
    },
  })
);
