import React from 'react';
import Button from "@material-ui/core/Button";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from "@material-ui/core/styles";
import tno_logo from '../resources/tno-logo.png'


const TNOLogo = props => {
    return (
        <img src={tno_logo} alt="" {...props}/>
    )
}

const Header = () => {

    return (
        <AppBar position="static">
            <Toolbar>
                <TNOLogo width={50} height={50}/>
                <Typography variant="h6">
                    Consent Manager
                </Typography>
            </Toolbar>
        </AppBar>
    )
};

export default Header;
