import React from 'react';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import {withStyles} from "@material-ui/core/styles";

export const CustomTabs = withStyles(theme => ({
    indicator: {
        display: "flex",
        justifyContent: "center",
        backgroundColor: "transparent",
        height: 3,
        "& > div": {
            borderTopLeftRadius: 3,
            borderTopRightRadius: 3,
            maxWidth: 40,
            marginRight: 10,
            width: "100%",
            backgroundColor: theme.palette.primary.main
        }
    }
}))(props => <Tabs {...props} TabIndicatorProps={{ children: <div /> }} />);

export const CustomTab = withStyles((theme) => ({

    root: {
        textTransform: 'none',
        minWidth: 40,
        marginRight: theme.spacing(4),
        fontWeight: theme.typography.fontWeightRegular,
        fontSize: theme.typography.pxToRem(15),
        paddingLeft: 0,
        marginLeft: 0,
        '&:hover': {
            color: theme.palette.primary.light,
            opacity: 1,
        },
        "&$selected": {
            color: theme.palette.primary.main,
            fontWeight: theme.typography.fontWeightMedium
        },
    },
    wrapper: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    selected: {}
}))((props) => <Tab disableRipple {...props} />);

export const CustomTabsSecondary = withStyles(theme => ({
    indicator: {
        display: "flex",
        justifyContent: "center",
        backgroundColor: "transparent",
        height: 3,
        "& > div": {
            borderTopLeftRadius: 3,
            borderTopRightRadius: 3,
            maxWidth: 40,
            marginRight: 10,
            width: "100%",
            backgroundColor: '#fafafa',
        }
    }
}))(props => <Tabs {...props} TabIndicatorProps={{ children: <div /> }} />);

export const CustomTabSecondary = withStyles((theme) => ({

    root: {
        textTransform: 'none',
        minWidth: 40,
        marginRight: theme.spacing(4),
        fontWeight: theme.typography.fontWeightRegular,
        fontSize: theme.typography.pxToRem(15),
        color: '#afafaf',
        paddingLeft: 0,
        marginLeft: 0,
        '&:hover': {
            color: '#eeeeee',
            opacity: 1,
        },
        "&$selected": {
            color: '#fafafa',
            fontWeight: theme.typography.fontWeightMedium
        },
    },
    wrapper: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    selected: {}
}))((props) => <Tab disableRipple {...props} />);
