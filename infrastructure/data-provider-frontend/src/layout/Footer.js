import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import {Container, Link} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    footer: {
        marginTop: 'auto',
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    footerShift: {
        marginLeft: theme.drawerWidth,
        width: `calc(100% - ${theme.drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
}));

const Footer = props =>  {
    const classes = useStyles();

    return (
        <Paper className={clsx(classes.footer, props.drawerOpen && classes.footerShift)}>
            <Container>
                <Typography variant={"h4"}>A Product of TNO</Typography>
            </Container>
        </Paper>
    )
}

Footer.propTypes = {
    drawerOpen: PropTypes.bool.isRequired
}

Footer.defaultProps = {
    drawerOpen: false
}

export default Footer;
