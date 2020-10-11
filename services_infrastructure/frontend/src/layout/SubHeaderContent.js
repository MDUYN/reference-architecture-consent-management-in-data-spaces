import React from 'react';
import Grid from "@material-ui/core/Grid";
import Typography from '@material-ui/core/Typography';
import {makeStyles} from "@material-ui/core/styles";
import {CustomTabSecondary, CustomTabsSecondary} from "../components/navigation/tabs";
import {useRouter} from "next/router";


const useStyles = makeStyles(theme => ({
    header: {
        color: '#ffffff',
        [theme.breakpoints.up('sm')]: {
            fontSize: 18,
        },
        [theme.breakpoints.up('md')] : {
            fontSize: 20,
        }
    },
    grow: {
        flexGrow: 1,
    },
    toolbar: {
        backgroundColor: theme.palette.primary.light,
    },
    title: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2)
    },
    active: {
        color: theme.palette.primary.main,
    }
}));

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const SubHeaderContent = () => {
    const router = useRouter();

    const initialValue = () => {
        const {pathname} = router;

        if(pathname.includes('/data-provider')) {
            return 0;
        } else if(pathname.includes('/consent-manager')) {
            return 1;
        } else if(pathname.includes('/data-consumer')) {
            return 2;
        }
        return 0;
    }

    const [value, setValue] = React.useState(initialValue());

    const handleChange = (event, newValue) => {
        setValue(newValue);

        if(newValue === 0) {
            router.push('/data-provider');
        } else if(newValue === 1) {
            router.push('/consent-manager');
        } else if(newValue === 2) {
            router.push('/data-consumer');
        }
    };

    return (
        <>
            <Grid
                container
                direction="row"
                justify="flex-start"
                alignItems="center"
            >
                <Grid item xs={12}>
                    <CustomTabsSecondary
                        textColor="secondary"
                        value={value} onChange={handleChange}
                        aria-label="simple tabs example"
                    >
                        <CustomTabSecondary label="Data Provider" {...a11yProps(0)} />
                        <CustomTabSecondary label="Consent Manager" {...a11yProps(1)} />
                        <CustomTabSecondary label="Data Consumer" {...a11yProps(2)} />
                    </CustomTabsSecondary>
                </Grid>
            </Grid>
        </>
    )
};


export default SubHeaderContent;