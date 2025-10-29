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
  ListSubheader,
} from "@mui/material";
import React from "react";
import { EditorDrawerBoxContainer } from "./EditorDrawer.styles";
import ConstructionIcon from "@mui/icons-material/Construction";
import MouseIcon from "@mui/icons-material/Mouse";
import TextFieldsIcon from "@mui/icons-material/TextFields";
import { useAppDispatch } from "../../../app/hook";
import { clearGroups } from "../../../entities/canvas/couplingSlice";
// import { addText, clearTexts } from "../EditorTitle/textSlice1";
import { v4 as uuidv4 } from "uuid";
import { EditorButtonEvent } from "../Tools/EditorButtonEvent/EditorButtonEvent";
import { EditorButtonRotate } from "../Tools/EditorButtonRotate/EditorButtonRotate";
import CropRotateIcon from "@mui/icons-material/CropRotate";
import { TextSettingsPanel } from "../EditorTitle/EditorText/EditorTextSettingsPanel";
import { Divider } from "../EditorTitle/EditorText/EditorTextSettingsPanel.styles";
import { addText, clearTexts } from "../../../entities/canvas/textSlice";

// Размер панели
const drawerWidth = 300;

export const EditorDrawer = () => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const drawerWidth = 300;

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
            <EditorButtonEvent />
          </ListItem>

          <ListItem>
            <ListItemIcon>
              <CropRotateIcon />
            </ListItemIcon>
            <EditorButtonRotate />
          </ListItem>

        <Divider />

        <List subheader={<ListSubheader>Настройки текста</ListSubheader>}>
        <ListItem disablePadding>
            <ListItemButton onClick={handleAddText}>
              <ListItemIcon>
                <TextFieldsIcon />
              </ListItemIcon>
              <ListItemText primary="Добавить текст" />
            </ListItemButton>
          </ListItem>
        </List>

          <ListItem>
            <Box sx={{ flexGrow: 1 }}>
              <TextSettingsPanel />
            </Box>
          </ListItem>
        </List>
      </Drawer>
    </EditorDrawerBoxContainer>
  );
};
