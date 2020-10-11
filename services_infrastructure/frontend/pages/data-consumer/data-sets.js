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
import Button from "@material-ui/core/Button";

const listConsentManagerDataSetsEffect = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(consentManagerListDataSetsActions.request());
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
    const [selectedDataSet, setSelectedDataset] = React.useState('');
    const dispatch = useDispatch();

    listConsentManagerDataSetsEffect();

    const handleDataSetChange = (event) => {
        setSelectedDataset(event.target.value);
    };

    return (
        <>
            <br/>
            <br/>
            <Paper style={{padding: 10}}>
                <Typography>Available Data Sets</Typography>
                <br/>
                <FormControl className={classes.formControl}>
                    <InputLabel id="demo-simple-select-label">Data Provider</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={selectedDataSet}
                        onChange={handleDataSetChange}
                    >
                        {dataSets.map((dataSet) =>
                            <MenuItem value={dataSet.id}>{dataSet.id}</MenuItem>
                        )}
                    </Select>
                </FormControl>
                <br/>
                <br/>
                <Button variant={"contained"}>Request Policy</Button>
            </Paper>
        </>
    )
}

export default Overview;