import { styled } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import MenuIcon from '@mui/icons-material/Menu';
import { ListItem, ListItemIcon, ListItemText, ListSubheader, Switch } from '@mui/material';
import { useState } from 'react';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import ExtensionOutlinedIcon from '@mui/icons-material/ExtensionOutlined';
import BrowserUpdatedOutlinedIcon from '@mui/icons-material/BrowserUpdatedOutlined';
import UpdateOutlinedIcon from '@mui/icons-material/UpdateOutlined';
import NightsStayOutlinedIcon from '@mui/icons-material/NightsStayOutlined';
import { Link, Outlet, useMatch, useResolvedPath } from 'react-router-dom';

const drawerWidth = 360;

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        '& .MuiDrawer-paper': {
            position: 'relative',
            whiteSpace: 'nowrap',
            width: drawerWidth,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
            boxSizing: 'border-box',
            ...(!open && {
                overflowX: 'hidden',
                transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                }),
                width: theme.spacing(7),
                [theme.breakpoints.up('sm')]: {
                    width: theme.spacing(9),
                },
            }),
        },
    }),
);

function Layout() {

    const [open, setOpen] = useState(true);
    const toggleDrawer = () => {
        setOpen(!open);
    };

    // const theme = useTheme()


    return (
        <Box sx={{ display: 'flex' }}>
            <Drawer
                variant="permanent"
                PaperProps={{ style: { borderRadius: `0 12px 12px 0` } }}
                open={open}
            >
                <Toolbar
                >
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={toggleDrawer}
                    // sx={{
                    //     marginRight: '36px',
                    //     ...(open && { display: 'none' }),
                    // }}
                    >
                        <MenuIcon />
                    </IconButton>

                </Toolbar>
                <List sx={{ p: 1 }}>
                    <ListSubheader sx={{ mt: -2.6 }} inset={open ? false : true}>Brunch PWA</ListSubheader>
                    <CustomLink to="/">
                        <ListItemIcon >
                            <BrowserUpdatedOutlinedIcon />
                        </ListItemIcon>
                        <ListItemText primary="Brunch Updater" />
                    </CustomLink>
                    <CustomLink to="/chromeos-updates">
                        <ListItemIcon>
                            <UpdateOutlinedIcon />
                        </ListItemIcon>
                        <ListItemText primary="ChromeOS Updater" />
                    </CustomLink>
                    <CustomLink to="/addons">
                        <ListItemIcon>
                            <ExtensionOutlinedIcon />
                        </ListItemIcon>
                        <ListItemText primary="Addons" />
                    </CustomLink>

                </List>
                <List sx={{ mt: 'auto', p: 1 }}>
                    <ListItem button sx={{ borderRadius: 15, mb: 1 }}>
                        <ListItemIcon>
                            <NightsStayOutlinedIcon />
                        </ListItemIcon>
                        <ListItemText primary="Dark Mode" />
                        <Switch
                            edge="end"
                            onChange={() => null}
                            // checked={checked.indexOf('wifi') !== -1}
                            inputProps={{
                                'aria-labelledby': 'switch-list-label-wifi',
                            }}
                        />
                    </ListItem>
                    <CustomLink to="/settings">
                        <ListItemIcon>
                            <SettingsOutlinedIcon />
                        </ListItemIcon>
                        <ListItemText primary="Settings" />
                    </CustomLink>
                </List>
            </Drawer>
            <Box
                component="main"
                sx={{
                    // backgroundColor: (theme) =>
                    //     theme.palette.mode === 'light'
                    //         ? theme.palette.grey[900]
                    //         : theme.palette.grey[900],
                    flexGrow: 1,
                    height: '100vh',
                    overflow: 'auto',
                }}
            >
                <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                    <Outlet />
                </Container>
            </Box>
        </Box>
    );
}

function CustomLink({ children, to, ...props }) {
    let resolved = useResolvedPath(to);
    let match = useMatch({ path: resolved.pathname, end: true });

    return (
        <ListItem
            component={Link}
            button
            sx={{ borderRadius: 15, mb: 1 }}
            selected={match}
            to={to}
            {...props}
        >
            {children}
        </ListItem>
    );
}


export default Layout;