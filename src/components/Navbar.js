import React, { useState } from 'react';
import { CssBaseline, AppBar, Toolbar, IconButton, Typography, ListItem, ListItemIcon, ListSubheader, ListItemText, Drawer, List, Divider, Tooltip,Menu, MenuItem } from '@material-ui/core';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import DashboardIcon from '@material-ui/icons/DashboardOutlined';
import AssignmentIcon from '@material-ui/icons/Assignment';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import SettingsIcon from '@material-ui/icons/Settings';

import { indigo } from '@material-ui/core/colors';


  

function SettingsButton() {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <IconButton color="inherit" onClick={handleClick}>
                < SettingsIcon />
            </IconButton>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
            </Menu>
        </div>
    )
}

export const mainListItems = (
    <div>
        <ListItem button>
            <ListItemIcon>
                <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button>
            <ListItemIcon>
                <BarChartIcon />
            </ListItemIcon>
            <ListItemText primary="Reports" />
        </ListItem>
    </div>
);

export const secondaryListItems = (
    <div>
        <ListSubheader inset>Saved data</ListSubheader>
        <ListItem button>
            <ListItemIcon>
                <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="Current day" />
        </ListItem>
        <ListItem button>
            <ListItemIcon>
                <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="Last week" />
        </ListItem>
        <ListItem button>
            <ListItemIcon>
                <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="Last month" />
        </ListItem>
    </div>
);
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
    },
    toolbarIcon: {
        backgroundColor: indigo[400],
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    menuButtonHidden: {
        display: 'none',
    },
    title: {
        flexGrow: 1,
    },
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        border: 'none',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(6),
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(7),
        },
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    fixedHeight: {
        height: 240,
    },
}));
export default function Navbar() {
    const classes = useStyles();
    const [isOpen, setIsOpen] = useState(true);
    const handleDrawer = () => setIsOpen(!isOpen);


    return (
        <>
            <CssBaseline />
            <AppBar position="absolute" className={clsx(classes.appBar, isOpen && classes.appBarShift)}>
                <Toolbar className={classes.toolbar}>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawer}
                        className={clsx(classes.menuButton, isOpen && classes.menuButtonHidden)}
                    >
                        <Tooltip title="open" arrow>
                            <ChevronRightIcon />
                        </Tooltip>
                    </IconButton>
                    <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
                        exchange rates Viewer
                    </Typography>
                    <SettingsButton />
                </Toolbar>
            </AppBar>
            <Drawer
                PaperProps={
                    { elevation: 2 }
                }
                variant="permanent"
                classes={{
                    paper: clsx(classes.drawerPaper, !isOpen && classes.drawerPaperClose),
                }}
                open={isOpen}
            >
                <div className={classes.toolbarIcon}>
                    <IconButton onClick={handleDrawer}>
                        <Tooltip title="hide" arrow>
                            <ChevronLeftIcon style={{ color: 'white' }} />
                        </Tooltip>
                    </IconButton>
                </div>
                <Divider />
                <List>
                    <List>{mainListItems}</List>
                </List>
                <Divider />
                <List>{secondaryListItems}</List>
            </Drawer>
        </>
    )
}
