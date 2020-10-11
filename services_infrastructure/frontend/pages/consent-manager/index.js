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
import {consentManagerListDataProvidersActions, consentManagerListDataSetsActions} from "../../src/redux/actions";
import {Typography} from "@material-ui/core";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import {baseUrl} from "../../src/services";

const listConsentManagerDataProvidersEffect = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(consentManagerListDataProvidersActions.request());
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
    formControl: {
        margin: theme.spacing(1),
        minWidth: 300,
    },
}));

const Overview = () => {
    const classes = useStyles();
    const dataProviders = useSelector(state => state.consentManager.dataProviders.items);
    const dataSets = useSelector(state => state.consentManager.dataSets.items);
    const [selectedDataProvider, setSelectedDataProvider] = React.useState('');
    const dispatch = useDispatch();

    listConsentManagerDataProvidersEffect();

    const handleDataProviderChange = (event) => {
        setSelectedDataProvider(event.target.value);
        dispatch(consentManagerListDataSetsActions.request(event.target.value));
    };

    return (
        <>
            <br/>
            <br/>
            <Paper style={{padding: 10}}>
                <Typography>Data Providers</Typography>
                <br/>
                <Typography>There are currently {dataProviders.length} data providers registered</Typography>
                <FormControl className={classes.formControl}>
                    <InputLabel id="demo-simple-select-label">Data Provider</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={selectedDataProvider}
                        onChange={handleDataProviderChange}
                    >
                        {dataProviders.map((dataProvider) =>
                            <MenuItem value={dataProvider.id}>{dataProvider.id}</MenuItem>
                        )}
                    </Select>
                </FormControl>
            </Paper>
            <br/>
            <br/>
            {selectedDataProvider && dataSets && dataSets.length > 0 &&
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
            }
        </>
    )
}

export default Overview;