import React from 'react';
import clsx from "clsx";
import { makeStyles } from '@material-ui/core/styles';
import Container from "@material-ui/core/Container";
import Toolbar from '@material-ui/core/Toolbar';
import Drawer from "@material-ui/core/Drawer";
import Grid from "@material-ui/core/Grid";
import tno_logo from '../resources/tno-logo.png'
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import SubHeaderContent from "./SubHeaderContent";
import {SideNavContent} from "./SideNavContent";

const useStyles = makeStyles((theme) => ({
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
    drawer: {
        width: theme.drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: theme.drawerWidth,
    },
    drawerContainer: {
        overflow: 'auto',
    },
    content: {
        flexGrow: 1,
        overflow: 'auto',
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    contentShift: {
        marginLeft: theme.drawerWidth,
        width: `calc(100% - ${theme.drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    appBarSpacer: theme.mixins.toolbar,
    container: {
        minHeight: '86vh',
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    footer: {
        padding: theme.spacing(3, 2),
        marginTop: 'auto',
        backgroundColor: theme.palette.secondary.dark,
        maxWidth: `calc(100% - ${theme.drawerWidth}px)`,
    },
    listItem: {
        fontSize: 14
    },
    listItemActive: {
        color: theme.palette.secondary.main
    }
}));

const TNOLogo = props => {
    return (
        <img src={tno_logo} alt="" {...props}/>
    )
}

const Layout = props => {
    const classes = useStyles();
    const {children} = props;

    return (
        <>
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar style={{minHeight: 100}}>
                    <Grid
                        container
                        direction="row"
                        justify="flex-start"
                        alignItems="flex-start"
                    >
                        <Grid item xs={12}>
                            <Grid
                                container
                                direction="row"
                                justify="space-between"
                                alignItems="center"
                            >
                                <Grid item>
                                    <Typography variant="h6" noWrap>
                                        Data Provider
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <TNOLogo height={50} width={250}/>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <SubHeaderContent/>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
            <Drawer
                className={classes.drawer}
                variant="permanent"
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <Toolbar />
                <Toolbar />
                <SideNavContent/>
            </Drawer>
            <main className={clsx(classes.content, classes.contentShift)}>
                <div className={classes.appBarSpacer} />
                <Container maxWidth="lg" className={classes.container}>
                    {children}
                </Container>
            </main>
        </>
    )
}

export default Layout;
