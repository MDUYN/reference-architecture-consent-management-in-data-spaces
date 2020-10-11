import React, {useEffect, useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from "@material-ui/core/Typography";
import {
    dataProviderListDataOwnersActions,
    consentManagerCreateDataProviderActions,
    consentManagerCreateDataOwnerActions,
    consentManagerCreateDataSetActions,
    dataProviderListDataSetsActions
} from "../../src/redux/actions";
import {Button} from "@material-ui/core";

const listDataOwnersEffect = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(dataProviderListDataOwnersActions.request());
    }, []);
}

const listDataSetsEffect = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(dataProviderListDataSetsActions.request());
    }, []);
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
}));

const Overview = () => {
    const dataProviderUUID = 'bfab2bf3-0dbe-4dc9-84e8-fc444173fe24';

    const classes = useStyles();
    const dataOwners = useSelector(state => state.dataProvider.dataOwners.items);
    const dataSets = useSelector(state => state.dataProvider.dataSets.items);
    const dispatch = useDispatch();

    listDataOwnersEffect();
    listDataSetsEffect();


    const handleDataProviderRegisterClick = () => {
        dispatch(consentManagerCreateDataProviderActions.request(dataProviderUUID));
     };

    const handleDataOwnersRegisterClick = () => {
        dataOwners.map((dataOwner) => (
            dispatch(consentManagerCreateDataOwnerActions.request(dataOwner.id))
        ));
    }

    const handleDataSetsRegisterClick = () => {
        dataSets.map((dataset) => {
            const dataOwners = [];
            dataset.data_owners.map((data_owner) => dataOwners.push(data_owner.id));

            dispatch(consentManagerCreateDataSetActions.request(
                dataProviderUUID, dataset.id, dataset.data_category, dataOwners
            ))
        });
    }

    return (
        <>
            <br/>
            <br/>
            <Paper style={{padding: 10}}>
                <Typography>Data Owners</Typography>
                <TableContainer>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="left">Data Owner ID</TableCell>
                            </TableRow>
                        </TableHead>
                        {(dataOwners && dataOwners.length > 0) &&
                        <TableBody>
                            {dataOwners.map((row) => (
                                <TableRow key={row.id}>
                                    <TableCell align="left">
                                        {row.id}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                        }
                    </Table>
                </TableContainer>
            </Paper>
            <br/>
            <br/>
            <Paper style={{padding: 10}}>
                <Typography>Data Sets</Typography>
                <TableContainer>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="left">Data Set ID</TableCell>
                                <TableCell align="left">Data Category</TableCell>
                                <TableCell align="left">Amount of Owners</TableCell>
                            </TableRow>
                        </TableHead>
                        {(dataSets && dataSets.length > 0) &&
                        <TableBody>
                            {dataSets.map((row) => (
                                <TableRow key={row.id}>
                                    <TableCell align="left">
                                        {row.id}
                                    </TableCell>
                                    <TableCell align="left">
                                        {row.data_category}
                                    </TableCell>
                                    <TableCell align="left">
                                        {row.data_owners.length}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                        }
                    </Table>
                </TableContainer>
            </Paper>
            <br/>
            <br/>
            <Button variant={"contained"} color={"secondary"} onClick={() => handleDataProviderRegisterClick()}>Register data provider at consent manager</Button>
            <br/>
            <br/>
            <Button variant={"contained"} color={"secondary"} onClick={() => handleDataOwnersRegisterClick()}>Register data owners at consent manager</Button>
            <br/>
            <br/>
            <Button variant={"contained"} color={"secondary"} onClick={() => handleDataSetsRegisterClick()}>Register data sets at consent manager</Button>
        </>
    )
}

export default Overview;