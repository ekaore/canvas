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
  Divider,
  ListSubheader,
} from "@mui/material";
import React from "react";
import { EditorDrawerBoxContainer } from "./EditorDrawer.styles";
import ConstructionIcon from "@mui/icons-material/Construction";
import MouseIcon from "@mui/icons-material/Mouse";
import TextFieldsIcon from "@mui/icons-material/TextFields";
import FormatSizeIcon from "@mui/icons-material/FormatSize";
import { EditorButton } from "../EditorTools/EditorButton/EditorButton";
import { useAppDispatch } from "../../../app/hook";
import { clearCouplings } from "../../../entities/canvas/couplingSlice";
import { addText, clearTexts } from "../EditorTitle/EditorText/TextSlice";
import { TextSettingsPanel } from "../EditorTitle/EditorText/EditorTextSettingsPanel";
// import { addText, clearTexts } from "../EditorTitle/TextSlice";
// import { TextSettingsPanel } from "../EditorTitle/TextSettingsPanel";

// Размер панели
const drawerWidth = 300;

export const EditorDrawer = () => {
  const theme = useTheme();
  const dispatch = useAppDispatch();

  // Кнопка "Новый холст"
  const handleNewCanvas = () => {
    dispatch(clearCouplings());
    dispatch(clearTexts());
  };

  // Добавить новый текст
  const handleAddText = () => {
    dispatch(
      addText({
        id: Date.now().toString(),
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
          <Typography variant="h6" noWrap>
            Редактор
          </Typography>

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
            <EditorButton />
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
            <ListItemIcon>
              <FormatSizeIcon />
            </ListItemIcon>
            <Box sx={{ flexGrow: 1 }}>
              <TextSettingsPanel />
            </Box>
          </ListItem>
        </List>
      </Drawer>
    </EditorDrawerBoxContainer>
  );
};
