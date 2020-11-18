import React, {useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import {Typography} from "@material-ui/core";
import Checkbox from "@material-ui/core/Checkbox";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import ReactJson from 'react-json-view'

const policy = {
    "@context": "http://www.w3.org/ns/odrl.jsonld",
    "uid": "http://example.com/policy:00a6501e-56e5-46f8-9cd2-1ba2d498d8f3",
    "permission": [{
        "target": "http://example.com/b31da16a-4052-4fc1-9ca1-6236103d12b9",
        "assignee": "dfcaf6a6-27c0-41fd-a0e5-7d112d3ed653",
        "action": "read",
        "constraint": [{
            "operator": "eq",
            "dateTime": "P30D"
        }]
    }]
}

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: '25ch',
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 300,
    },
}));

const Overview = () => {
    const classes = useStyles();

    return (
        <>
            <br/>
            <br/>
            <Paper style={{padding: 10}}>
                <Typography>Data Sets</Typography>
                <TableContainer>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell/>
                                <TableCell align="left">Data Set ID</TableCell>
                                <TableCell align="left">Obtained at</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell>
                                    <Checkbox/>
                                </TableCell>
                                <TableCell align="left">
                                    b31da16a-4052-4fc1-9ca1-6236103d12b9
                                </TableCell>
                                <TableCell align="left">
                                    03-10-2020
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
            <br/>
            <br/>
            <Paper style={{padding: 10}}>
                <Typography>Permissions of data set b31da16a-4052-4fc1-9ca1-6236103d12b9</Typography>
                <FormGroup>
                    <FormControlLabel
                        control={<Switch checked name="researchPermission"/>}
                        label="Allow research usage"
                    />
                    <FormControlLabel
                        control={<Switch checked name="commercialPermission"/>}
                        label="Allow commercial usage"
                    />
                </FormGroup>
            </Paper>
            <br/>
            <br/>
            <Paper style={{padding: 10}}>
                <Typography>Obligations of data set b31da16a-4052-4fc1-9ca1-6236103d12b9</Typography>
                <FormGroup>
                    <FormControlLabel
                        control={<Switch checked name="deleteAfterAWeekObligation"/>}
                        label="Delete after a week"
                    />
                    <FormControlLabel
                        control={<Switch checked={false} name="deleteAfterAMonthObligation"/>}
                        label="Delete after a month"
                    />
                </FormGroup>
            </Paper>
            <br/>
            <br/>
            <Paper style={{padding: 10}}>
                <Typography>Raw policy</Typography>
                <br/>
                <ReactJson src={policy} />
            </Paper>
        </>
    )
}

export default Overview;