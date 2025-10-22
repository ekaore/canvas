    import { Inbox, Mail, Menu } from '@mui/icons-material';
    import { AppBar, Box, CssBaseline, Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText, styled, Toolbar, Typography, useTheme } from '@mui/material';
    import React from 'react';

    const drawerWidth = 240;

    const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
    open?: boolean;
    }>(({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
        transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    }),
    }));

    export const    EditorDrawer: React.FC = () => {
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const toggleDrawer = () => {
        setOpen(!open);
    };

    return (
        <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="fixed" sx={{ zIndex: theme.zIndex.drawer + 1 }}>
            <Toolbar>
            <IconButton color="inherit" edge="start" onClick={toggleDrawer}>
                <Menu />
            </IconButton>
            <Typography variant="h6" noWrap>
                Mini variant drawer
            </Typography>
            </Toolbar>
        </AppBar> 

        <Drawer
            variant="permanent"
            open={open}
            sx={{
            width: open ? drawerWidth : 60,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
                width: open ? drawerWidth : 60,
                boxSizing: 'border-box',
                overflowX: 'hidden',
                transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
                }),
            },
            }}
        >
            <Toolbar />
            <List>
            {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                <ListItem key={text}>
                <ListItemIcon>{index % 2 === 0 ? <Inbox /> : <Mail />}</ListItemIcon>
                {open && <ListItemText primary={text} />}
                </ListItem>
            ))}
            </List>
        </Drawer>   
        </Box>
    );
    };
