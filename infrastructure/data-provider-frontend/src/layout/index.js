import React from 'react';
import clsx from "clsx";
import { makeStyles } from '@material-ui/core/styles';
import Container from "@material-ui/core/Container";
import Toolbar from '@material-ui/core/Toolbar';
import Drawer from "@material-ui/core/Drawer";

import Header from './Header';
import Footer from "./Footer";

const useStyles = makeStyles((theme) => ({
    appBar: {
        zIndex: theme.zIndex.drawer + 2,
    },
    appBarSpacer: theme.mixins.toolbar,
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
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
}));

const Layout = props => {
    const classes = useStyles();
    const {children} = props;

    return (
        <>
            <Header/>
            <Drawer
                className={classes.drawer}
                variant="permanent"
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <Toolbar />
            </Drawer>
            <main className={clsx(classes.content, classes.contentShift)}>
                <Container maxWidth="lg" className={classes.container}>
                    {children}
                </Container>
            </main>
            <Footer/>
        </>
    )
}

export default Layout;
