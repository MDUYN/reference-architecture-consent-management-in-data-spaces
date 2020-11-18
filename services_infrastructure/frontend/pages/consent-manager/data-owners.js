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

const Overview = () => {
    const classes = useStyles();
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

    const handleDataOwnerChange = (event) => {
        setSelectedDataOwner(event.target.value);
        dispatch(consentManagerListDataOwnerDataSetsActions.request(event.target.value));
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
                <Typography>Data Owner</Typography>
                {dataOwners && dataOwners.length > 0 &&
                <FormControl className={classes.formControl}>
                    <InputLabel id="demo-simple-select-label">Data Owner</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={selectedDataOwner}
                        onChange={handleDataOwnerChange}
                    >
                        {dataOwners.map((dataOwner) =>
                            <MenuItem value={dataOwner.id}>{dataOwner.id}</MenuItem>
                        )}
                    </Select>
                </FormControl>
                }
            </Paper>
            <br/>
            <br/>
            {selectedDataOwner && dataSets && dataSets.length > 0 &&
            <Paper className={classes.contentPaper}>
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
                    </Table>
                </TableContainer>
            </Paper>}
            <br/>
            <br/>
            {selectedDataOwner &&
            <Paper className={classes.contentPaper}>
                <Typography>Pending custom policy requests</Typography>
                <TableContainer>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align={"left"}/>
                                <TableCell align="left">Data Consumer ID</TableCell>
                                <TableCell align="left">Data Set ID</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell align={"left"}>
                                    <Checkbox/>
                                </TableCell>
                                <TableCell align="left">
                                    84e51bbf-cdc5-46fb-8ef9-b4895ae44bff
                                </TableCell>
                                <TableCell align="left">
                                    59df3462-3e76-4056-ac35-ad340c44a9c3
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
                <br/>
                <Grid
                    container
                    direction="row"
                    justify="flex-start"
                    alignItems="center"
                    spacing={2}
                >
                    <Grid item>
                        <Button color={"secondary"} variant={"contained"}>Accept</Button>
                    </Grid>
                    <Grid item>
                        <Button color={"secondary"} variant={"contained"}>Reject</Button>
                    </Grid>
                </Grid>
                <br/>
                <Divider/>
                <br/>
                <Typography>Requested permissions viewer</Typography>
                <List>
                    <ListItem><Typography color={"secondary"}>Commercial usage:</Typography>  &nbsp; True</ListItem>
                </List>
                <br/>
                <Typography>Requested obligations view</Typography>
                <List>
                    <ListItem><Typography color={"secondary"}>Delete after a month:</Typography>  &nbsp; True</ListItem>
                </List>
            </Paper>
            }
            <br/>
            <br/>
            {selectedDataOwner &&
            <Paper className={classes.contentPaper}>
                <FormControl component="fieldset">
                    <FormLabel component="legend">Define Global Permissions</FormLabel>
                    <br/>
                    <FormControl className={classes.formControl}>
                        <InputLabel id="demo-simple-select-label">Data Category</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={permissionsDataCategory}
                            onChange={handlePermissionDataCategoryChange}
                        >
                            <MenuItem value={'energy_usage_data'}>energy_usage_data</MenuItem>
                            <MenuItem value={'energy_generation_data'}>energy_generation_data</MenuItem>
                            <MenuItem value={'energy_storage_data'}>energy_storage_data</MenuItem>
                        </Select>
                    </FormControl>
                    <br/>
                    <br/>
                    {permissionsDataCategory !== '' &&
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
                    }
                </FormControl>
                <br/>
                <br/>
                <Button variant={"contained"} disabled={permissionsDataCategory === ''} color={"secondary"} onClick={() => handlePermissionUpdate()}>Update</Button>
            </Paper>
            }
            <br/>
            <br/>
            {selectedDataOwner &&
            <Paper className={classes.contentPaper}>
                <FormControl component="fieldset">
                    <FormLabel component="legend">Define Global Obligations</FormLabel>
                    <br/>
                    <FormControl className={classes.formControl}>
                        <InputLabel id="demo-simple-select-label">Data Category</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={obligationsDataCategory}
                            onChange={handleObligationDataCategoryChange}
                        >
                            <MenuItem value={'energy_usage_data'}>energy_usage_data</MenuItem>
                            <MenuItem value={'energy_generation_data'}>energy_generation_data</MenuItem>
                            <MenuItem value={'energy_storage_data'}>energy_storage_data</MenuItem>
                        </Select>
                    </FormControl>
                    <br/>
                    <br/>
                    {obligationsDataCategory !== '' &&
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
                    }
                </FormControl>
                <br/>
                <br/>
                <Button variant={"contained"} disabled={obligationsDataCategory === ''} color={"secondary"} onClick={() => handleObligationUpdate()}>Update</Button>
            </Paper>
            }
        </>
    )
}

export default Overview;