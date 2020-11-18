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
import {Divider, Typography} from "@material-ui/core";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

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
                <Typography>Available Data Providers</Typography>
                <br/>
                <Typography>There is currently {dataProviders.length} data provider available</Typography>
                <br/>
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
                <Typography>Available Data Sets</Typography>
                <TableContainer>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell/>
                                <TableCell align="left">Data Set ID</TableCell>
                                <TableCell align="left">Data Category</TableCell>
                                <TableCell align="left">Amount of Owners</TableCell>
                            </TableRow>
                        </TableHead>
                        {(dataSets && dataSets.length > 0) &&
                        <TableBody>
                            {dataSets.map((row) => (
                                <TableRow key={row.id}>
                                    <TableCell>
                                        <Checkbox/>
                                    </TableCell>
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
                <br/>
                <Typography>Default Permissions</Typography>
                <br/>
                <List>
                    <ListItem><Typography color={"secondary"}>Commercial usage:</Typography>  &nbsp; True</ListItem>
                    <ListItem><Typography color={"secondary"}>Research usage:</Typography>  &nbsp; True</ListItem>
                </List>
                <br/>
                <Typography>Default Obligations</Typography>
                <br/>
                <List>
                    <ListItem><Typography color={"secondary"}>Delete after week:</Typography>  &nbsp; True</ListItem>
                    <ListItem><Typography color={"secondary"}>Delete after a month:</Typography>  &nbsp; false</ListItem>
                </List>
                <br/>
                <Divider/>
                <br/>
                <Typography>Custom policy request</Typography>
                <br/>
                <Typography>Define custom permission</Typography>
                <br/>
                <FormGroup>
                    <FormControlLabel
                        control={<Switch checked={false} name="researchPermission"/>}
                        label="Allow research usage"
                    />
                    <FormControlLabel
                        control={<Switch checked={false} name="commercialPermission"/>}
                        label="Allow commercial usage"
                    />
                </FormGroup>
                <br/>
                <br/>
                <Typography>Define custom obligation</Typography>
                <br/>
                <FormGroup>
                    <FormControlLabel
                        control={<Switch checked={false} name="deleteAfterAWeekObligation"/>}
                        label="Delete after a week"
                    />
                    <FormControlLabel
                        control={<Switch checked={false} name="deleteAfterAMonthObligation"/>}
                        label="Delete after a month"
                    />
                </FormGroup>
                <br/>
                <Grid
                    container
                    direction="row"
                    justify="flex-start"
                    alignItems="flex-start"
                    spacing={2}
                >
                    <Grid item>
                        <Button variant={"contained"}>Request policy</Button>
                    </Grid>
                    <Grid item>
                        <Button variant={"contained"}>Request custom policy</Button>
                    </Grid>
                </Grid>

                <br/>

            </Paper>
            }
        </>
    )
}

export default Overview;