  import { Menu } from "@mui/icons-material";
  import {
    AppBar,
    Box,
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
    Button, 
  } from "@mui/material";
  import React from "react";
  import { EditorDrawerBoxContainer } from "./EditorDrawer.styles";
  import ConstructionIcon from "@mui/icons-material/Construction";
  import MouseIcon from "@mui/icons-material/Mouse";
  import { EditorButton } from "../EditorTools/EditorButton/EditorButton";
  import { useAppDispatch} from "../../../app/hook";
  import { clearCouplings } from "../../../entities/canvas/couplingSlice";

  // Ширина панели
  const drawerWidth = 270;

  export const EditorDrawer = () => {
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const dispatch = useAppDispatch();

    const toggleDrawer = () => {
      setOpen(!open);
    };

    // Обработчик кнопки "Новый холст"
    const handleNewCanvas = () => {
      dispatch(clearCouplings());
    };

    return (
      <EditorDrawerBoxContainer>
        <CssBaseline />
        <AppBar position="fixed" sx={{ zIndex: theme.zIndex.drawer + 1 }}>
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <IconButton color="inherit" edge="start" onClick={toggleDrawer}>
                <Menu />
              </IconButton>
              <Typography variant="h6" noWrap>
                Редактор
              </Typography>
            </Box>

            {/* 🔹 Кнопка "Новый холст" справа */}
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
              {open && <EditorButton />}
            </ListItem>
          </List>
        </Drawer>
      </EditorDrawerBoxContainer>
    );
  };
