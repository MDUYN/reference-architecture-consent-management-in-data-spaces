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
import {Divider, Typography} from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import FormHelperText from '@material-ui/core/FormHelperText';
import Switch from '@material-ui/core/Switch';
import Chip from "@material-ui/core/Chip";
import {
    consentManagerListDataOwnersActions,
    consentManagerListDataOwnerDataSetsActions,
    consentManagerListDataOwnerPermissionsActions,
    consentManagerListDataOwnerObligationsActions,
    consentManagerCreateDataOwnerPermissionActions,
    consentManagerCreateDataOwnerObligationActions
} from "../../src/redux/actions";
import Button from "@material-ui/core/Button";

const consentManagerListDataOwnersEffect = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(consentManagerListDataOwnersActions.request());
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
    contentPaper: {
        padding: 10
    }
}));

const Index = () => {
    const classes = useStyles();
    const [selectedDataCategory, setSelectedDataCategory] = useState("energy_usage_data");
    const dataOwners = useSelector(state => state.consentManager.dataOwners.items);
    const dataSets = useSelector(state => state.consentManager.dataSets.items);
    const dataPermissions = useSelector(state => state.consentManager.dataOwner.permissions);
    const dataObligations = useSelector(state => state.consentManager.dataOwner.obligations);
    const [obligationsDataCategory, setObligationsDataCategory] = React.useState('');
    const [permissionsDataCategory, setPermissionsDataCategory] = React.useState('');
    const [selectedDataOwner, setSelectedDataOwner] = React.useState('');
    const [statePermissions, setPermissions] = React.useState({
        researchPermission: false,
        commercialPermission: false,
    });

    const data_categories = ['energy_usage_data', 'energy_generation_data', 'energy_storage_data'];

    const [stateObligations, setObligations] = React.useState({
        deleteAfterAWeekObligation: false,
        deleteAfterAMonthObligation: false
    });

    const handlePermissionDataCategoryChange = (event) => {
        setPermissionsDataCategory(event.target.value);
        dispatch(consentManagerListDataOwnerPermissionsActions.request(selectedDataOwner, event.target.value));
    };

    const handleObligationDataCategoryChange = (event) => {
        setObligationsDataCategory(event.target.value);
        dispatch(consentManagerListDataOwnerObligationsActions.request(selectedDataOwner, event.target.value));
    };

    const handlePermissionChange = (event) => {
        setPermissions({ ...statePermissions, [event.target.name]: event.target.checked });
    };

    const handleObligationChange = (event) => {
        setObligations({ ...stateObligations, [event.target.name]: event.target.checked });
    };

    const dispatch = useDispatch();

    const handleDataCategoryChange = (event) => {
        setSelectedDataCategory(event.target.value);
    };

    const handlePermissionUpdate = (event) => {
        dispatch(consentManagerCreateDataOwnerPermissionActions.request(
            selectedDataOwner,
            'researchPermission',
            statePermissions.researchPermission.toString(),
            permissionsDataCategory
            )
        );
        dispatch(consentManagerCreateDataOwnerPermissionActions.request(
            selectedDataOwner,
            'commercialPermission',
            statePermissions.commercialPermission.toString(),
            permissionsDataCategory
            )
        );
    }

    const handleObligationUpdate = (event) => {
        dispatch(consentManagerCreateDataOwnerObligationActions.request(
            selectedDataOwner,
            'deleteAfterAWeekObligation',
            stateObligations.deleteAfterAWeekObligation.toString(),
            obligationsDataCategory
            )
        );
        dispatch(consentManagerCreateDataOwnerObligationActions.request(
            selectedDataOwner,
            'deleteAfterAMonthObligation',
            stateObligations.deleteAfterAMonthObligation.toString(),
            obligationsDataCategory
            )
        );
    }

    consentManagerListDataOwnersEffect();

    return (
        <>
            <br/>
            <br/>
            <Paper style={{padding: 10}}>
                <Typography>Data Category</Typography>
                <FormControl className={classes.formControl}>
                    <InputLabel id="demo-simple-select-label">Data Category</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={selectedDataCategory}
                        onChange={handleDataCategoryChange}
                    >
                        {data_categories.map((category) =>
                            <MenuItem value={category}>{category}</MenuItem>
                        )}
                    </Select>
                </FormControl>
            </Paper>
            <br/>
            <br/>
            {selectedDataCategory &&
                <Paper className={classes.contentPaper}>
                    <FormControl component="fieldset">
                        <Typography>Intent of Usage Permissions</Typography>
                        <FormGroup>
                            <FormControlLabel
                                control={<Switch checked={statePermissions.researchPermission} onChange={handlePermissionChange}
                                                 name="researchPermission"/>}
                                label="Allow research usage"
                            />
                            <FormControlLabel
                                control={<Switch checked={statePermissions.commercialPermission} onChange={handlePermissionChange}
                                                 name="commercialPermission"/>}
                                label="Allow commercial usage"
                            />
                        </FormGroup>
                    </FormControl>
                </Paper>
            }
            <br/>
            <br/>
            {selectedDataCategory &&
                <Paper className={classes.contentPaper}>
                    <Typography>Intent of Usage Obligations</Typography>
                    <FormGroup>
                        <FormControlLabel
                            control={<Switch checked={stateObligations.deleteAfterAWeekObligation} onChange={handleObligationChange}
                                             name="deleteAfterAWeekObligation"/>}
                            label="Delete after a week"
                        />
                        <FormControlLabel
                            control={<Switch checked={stateObligations.deleteAfterAMonthObligation} onChange={handleObligationChange}
                                             name="deleteAfterAMonthObligation"/>}
                            label="Delete after a month"
                        />
                    </FormGroup>
                </Paper>
            }
            <br/>
            <br/>
            <Paper className={classes.contentPaper}>
                <Grid
                    container
                    direction="row"
                    justify="flex-start"
                    alignItems="center"
                >
                    <Grid item>
                        <Button variant={"contained"} color={"secondary"}>Request</Button>
                    </Grid>
                </Grid>
                <br/>
                <br/>
                <Typography>Matching Consent Managers</Typography>
                <TableContainer>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="left">Consent Manager ID</TableCell>
                                <TableCell align="left">Data Set IDs</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow key={'12793409-0ac5-4f95-a1d9-ba252e8b90da'}>
                                <TableCell align="left">
                                    12793409-0ac5-4f95-a1d9-ba252e8b90da
                                </TableCell>
                                <TableCell align="left">
                                    752cba86-01b5-48b9-8158-70ce83f81a13, d79c7fc9-5bbe-4436-8e27-daa790ec7d6c
                                </TableCell>
                            </TableRow>
                            <TableRow key={'12793409-0ac5-4f95-a1d9-ba252e8b90da'}>
                                <TableCell align="left">
                                    2be92329-3006-4cae-b85b-23287ca0d08c
                                </TableCell>
                                <TableCell align="left">
                                    9f5464b7-14da-4dce-8772-bc9879e8298d
                                </TableCell>
                            </TableRow>
                            <TableRow key={'12793409-0ac5-4f95-a1d9-ba252e8b90da'}>
                                <TableCell align="left">
                                    46540c09-84ba-4ae4-baf4-093d4c147184
                                </TableCell>
                                <TableCell align="left">
                                    7e2e28cc-001a-4698-a158-3371556d8fea, e83e7d9d-26e3-4338-80af-4abbe99ce902
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </>
    )
}

export default Index;