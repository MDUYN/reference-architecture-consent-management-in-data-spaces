// Copyright component
import Typography from "@material-ui/core/Typography";
import Link from "../Link";
import React from "react";

const Copyright = () => {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://codingkitties.com/">
                Investing Algorithm marketplace
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
};

export default Copyright