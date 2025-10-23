import { Menu } from "@mui/icons-material";
import {
  AppBar,
  CssBaseline,
  Drawer,
  IconButton,
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
import MouseIcon from '@mui/icons-material/Mouse';
import { EditorButton } from "../EditorButton/EditorButton";

const drawerWidth = 240;

interface EditorDrawerProps {
  onAddCoupling: () => void;
}

export const EditorDrawer = ({onAddCoupling}:EditorDrawerProps ) => {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <EditorDrawerBoxContainer>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <IconButton color="inherit" edge="start" onClick={toggleDrawer}>
            <Menu />
          </IconButton>
          <Typography variant="h6" noWrap>
            Редактор
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        open={open}
        sx={{
          width: open ? drawerWidth : 60,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: open ? drawerWidth : 60,
            boxSizing: "border-box",
            overflowX: "hidden",
            transition: theme.transitions.create("width", {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
          },
        }}
      >
        <Toolbar />
        <List>
          <ListItem>
            <ListItemIcon>
              <ConstructionIcon />
            </ListItemIcon>
            {open && <ListItemText primary="Инструменты" />}
          </ListItem>
        </List>
        <List>
          <ListItem>
            <ListItemIcon>
              <MouseIcon />
            </ListItemIcon>
            {open && <EditorButton onAddCoupling={onAddCoupling} />}
          </ListItem>
        </List>
      </Drawer>
    </EditorDrawerBoxContainer>
  );
};
