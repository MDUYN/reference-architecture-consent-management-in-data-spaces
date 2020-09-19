import React, {useEffect, useState} from "react";
import Paper from "@material-ui/core/Paper";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Grid from "@material-ui/core/Grid";
import {makeStyles} from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import {useDispatch, useSelector} from "react-redux";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import {
    createDataOwnerActions,
    createDataSetActions,
    listDataOwnersActions,
    listDataSetsActions
} from "../src/redux/actions";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {Typography} from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 300,
    },
}));

const listDataOwnersEffect = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(listDataOwnersActions.request());
    }, [])
};

const listDataSetsEffect = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(listDataSetsActions.request());
    }, [])
};


const DataSets = () => {
    const classes = useStyles();
    const [loading, setLoading] = useState(false);
    const [checkedDataOwners, setCheckedDataOwners] = React.useState([]);
    const [dataSetIdentification, setDataSetIdentification] = useState('');
    const [dataCategory, setDataCategory] = React.useState('');
    const dataSetCreated = useSelector(state => state.dataSets.dataSetCreated);
    const dataOwners = useSelector(state => state.dataOwners.items);
    const dataSets = useSelector(state => state.dataSets.items);
    const dispatch = useDispatch();

    listDataOwnersEffect();
    listDataSetsEffect();

    const handleToggle = (value) => () => {
        const currentIndex = checkedDataOwners.indexOf(value);
        const newChecked = [...checkedDataOwners];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setCheckedDataOwners(newChecked);
    };

    const handleDataCategoryChange = (event) => {
        setDataCategory(event.target.value);
    };

    const handleRegisterClick = () => {
        dispatch(createDataSetActions.request(dataSetIdentification, dataCategory, checkedDataOwners));
        setLoading(true);
    };

    if(dataSetCreated === true) {
        dispatch(listDataSetsActions.request())
        setLoading(false);
    };

    return (
        <>
            <Paper style={{padding: 10}}>
                <Typography variant={"h6"}>Registered Data Sets</Typography>
                <TableContainer>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="left">Data Set ID</TableCell>
                            </TableRow>
                        </TableHead>
                        {(dataSets && dataSets.length > 0) &&
                        <TableBody>
                            {dataSets.map((row) => (
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
            <br/>
            <br/>
            <Paper style={{padding: 10}}>
                <Typography variant={"h6"}>Data Set Registration</Typography>
                <FormControl fullWidth>
                    <TextField
                        id="standard-full-width"
                        label="Data set Identification"
                        placeholder="Fill in data set identification"
                        helperText="The identification of the data set"
                        value={dataSetIdentification}
                        onChange={event => setDataSetIdentification(event.target.value)}
                        margin="normal"
                        fullWidth
                        InputLabelProps={{
                            shrink: true,
                        }}
                        disabled={loading}
                    />
                </FormControl>
                <br/>
                <br/>
                <Divider/>
                <FormControl className={classes.formControl}>
                    <InputLabel id="demo-simple-select-label">Data Category</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={dataCategory}
                        onChange={handleDataCategoryChange}
                    >
                        <MenuItem value={'energy_usage_data'}>energy_usage_data</MenuItem>
                        <MenuItem value={'energy_generation_data'}>energy_generation_data</MenuItem>
                        <MenuItem value={'energy_storage_data'}>energy_storage_data</MenuItem>
                    </Select>
                </FormControl>
                <br/>
                <br/>
                <Divider/>
                <br/>
                <br/>
                <Typography>Data Owners</Typography>
                <List>
                    {(dataOwners && dataOwners.length > 0) && dataOwners.map(dataOwner =>
                        {
                            const labelId = `checkbox-list-label-${dataOwner.id}`;

                            return (
                                <ListItem key={dataOwner.id} dense button onClick={handleToggle(dataOwner.id)}>
                                    <ListItemIcon>
                                        <Checkbox
                                            edge="start"
                                            checked={checkedDataOwners.indexOf(dataOwner.id) !== -1}
                                            tabIndex={-1}
                                            disableRipple
                                            inputProps={{ 'aria-labelledby': labelId }}
                                        />
                                    </ListItemIcon>
                                    <ListItemText id={labelId} primary={dataOwner.id} />
                                </ListItem>
                            )
                        }
                    )}
                </List>
                <Divider/>
                <br/>
                <br/>
                <Button
                    variant={"contained"}
                    color={'secondary'}
                    disabled={
                        dataSetIdentification.length === 0 ||
                        dataCategory === '' ||
                        checkedDataOwners.length === 0 ||
                        loading
                    }
                    onClick={() => handleRegisterClick()}
                >
                    Register
                </Button>
            </Paper>
        </>
    )
}

export default DataSets;