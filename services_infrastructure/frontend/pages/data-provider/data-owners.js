import React, {useState, useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Snackbar from "@material-ui/core/Snackbar";
import FormControl from "@material-ui/core/FormControl";
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import MuiAlert from '@material-ui/lab/Alert';

import {createAction} from "../../src/redux/actions";
import {dataProviderCreateDataOwnerActions, dataProviderListDataOwnersActions} from "../../src/redux/actions";
import {DATA_PROVIDER_CLEAR_DATA_OWNER_ERRORS} from "../../src/redux/types";
import {Typography} from "@material-ui/core";

const listDataOwnersEffect = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(dataProviderListDataOwnersActions.request());
    }, [])
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

const DataOwners = () => {
    const classes = useStyles();
    const [dataOwnerIdentification, setDataOwnerIdentification] = useState('');
    const [loading, setLoading] = useState(false);
    const dataOwners = useSelector(state => state.dataProvider.dataOwners.items);
    const dataOwnerCreated = useSelector(state => state.dataProvider.dataOwners.dataOwnerCreated);
    const dispatch = useDispatch();

    listDataOwnersEffect();

    // Error related states
    const error = useSelector(state => state.dataProvider.dataOwners.error);
    const errorMessage = useSelector(state => state.dataProvider.dataOwners.error_message);

    const handleAlertClose = () => {
        setLoading(false);
        dispatch(createAction(DATA_PROVIDER_CLEAR_DATA_OWNER_ERRORS));
        dispatch(dataProviderListDataOwnersActions.request());
    };

    const handleRegisterClick = () => {
        setDataOwnerIdentification('');
        dispatch(dataProviderCreateDataOwnerActions.request(dataOwnerIdentification));
        setLoading(true);
    };

    if(dataOwnerCreated === true) {
        dispatch(dataProviderListDataOwnersActions.request());
        setLoading(false);
    }

    return (
        <>
            <br/>
            <br/>
            <Snackbar
                open={error}
                anchorOrigin={{vertical: 'top', horizontal: 'center'}}
                autoHideDuration={6000}
                onClose={handleAlertClose}
            >
                <MuiAlert elevation={6} variant="filled" onClose={handleAlertClose} severity="error">
                    {errorMessage ? errorMessage : 'Something went wrong'}
                </MuiAlert>
            </Snackbar>
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
                <Typography>Data Owner Registration</Typography>
                <FormControl fullWidth>
                    <TextField
                        id="standard-full-width"
                        label="Data Owner Identification"
                        placeholder="Fill in data owner identification"
                        helperText="The identification of the data owner"
                        value={dataOwnerIdentification}
                        onChange={event => setDataOwnerIdentification(event.target.value)}
                        margin="normal"
                        fullWidth
                        InputLabelProps={{
                            shrink: true,
                        }}
                        disabled={loading}
                    />
                </FormControl>
                <Button
                    variant={"contained"}
                    color={'secondary'}
                    disabled={dataOwnerIdentification.length === 0 || loading}
                    onClick={() => handleRegisterClick()}
                >
                    Register
                </Button>
            </Paper>
        </>
    )
}

export default DataOwners;