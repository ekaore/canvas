import {
  AppBar,
  Box,
  Button,
  CssBaseline,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";
import { EditorDrawerBoxContainer } from "./EditorDrawer.styles";
import ConstructionIcon from "@mui/icons-material/Construction";
import MouseIcon from "@mui/icons-material/Mouse";
import { useAppDispatch } from "../../../app/hook";
import { clearCouplings } from "../../../entities/canvas/couplingSlice";
import { EditorTools } from "../EditorTools/EditorTools";

export const EditorDrawer = () => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const drawerWidth = 250;

  const handleNewCanvas = () => {
    dispatch(clearCouplings());
  };

  return (
    <EditorDrawerBoxContainer>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: theme.zIndex.drawer + 1 }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography variant="h6" noWrap>
              Редактор
            </Typography>
          </Box>

          <Button
            variant="outlined"
            color="inherit"
            onClick={handleNewCanvas}
            sx={{
              textTransform: "none",
              borderColor: "white",
              "&:hover": { backgroundColor: "rgba(255,255,255,0.1)" },
            }}
          >
            Новый холст
          </Button>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            overflowX: "hidden",
          },
        }}
      >
        <Toolbar />
        <List>
          <ListItem>
            <ListItemIcon>
              <ConstructionIcon />
            </ListItemIcon>
            <ListItemText primary="Инструменты" />
          </ListItem>
        </List>
        <List>
          <ListItem>
            <ListItemIcon>
              <MouseIcon />
            </ListItemIcon>
            <EditorTools />
          </ListItem>
        </List>
      </Drawer>
    </EditorDrawerBoxContainer>
  );
};
