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
  ListItemButton,
} from "@mui/material";
import React from "react";
import { EditorDrawerBoxContainer } from "./EditorDrawer.styles";
import ConstructionIcon from "@mui/icons-material/Construction";
import MouseIcon from "@mui/icons-material/Mouse";
import TextFieldsIcon from "@mui/icons-material/TextFields";
import { useAppDispatch } from "../../../app/hook";
import { clearGroups } from "../../../entities/canvas/couplingSlice";
import { addText, clearTexts } from "../EditorTitle/textSlice";
import { EditorTools } from "../EditorTools/EditorTools";
import { v4 as uuidv4 } from "uuid";


export const EditorDrawer = () => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const drawerWidth = 250;

  // Кнопка "Новый холст"
  const handleNewCanvas = () => {
    dispatch(clearGroups());
    dispatch(clearTexts());
  };

  // Добавить новый текст
  const handleAddText = () => {
    dispatch(
      addText({
        id: uuidv4(),
        x: 500,
        y: 500,
        text: "Новый текст",
      })
    );
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

          <ListItem>
            <ListItemIcon>
              <MouseIcon />
            </ListItemIcon>
            <EditorTools />
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton onClick={handleAddText}>
              <ListItemIcon>
                <TextFieldsIcon />
              </ListItemIcon>
              <ListItemText primary="Добавить текст" />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
    </EditorDrawerBoxContainer>
  );
};
