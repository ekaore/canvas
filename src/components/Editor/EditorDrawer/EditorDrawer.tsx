import {
  AppBar,
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
import { EditorButton } from "../EditorTools/EditorButton/EditorButton";

const drawerWidth = 250;

export const EditorDrawer = () => {
  const theme = useTheme();

  return (
    <EditorDrawerBoxContainer>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h6" noWrap>
            Редактор
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth, // фиксируем ширину
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth, // фиксируем ширину контейнера
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
            <EditorButton />
          </ListItem>
        </List>
      </Drawer>
    </EditorDrawerBoxContainer>
  );
};
