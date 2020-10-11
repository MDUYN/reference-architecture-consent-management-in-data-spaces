import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import List from "@material-ui/core/List";
import {useRouter} from "next/router";
import Link from "../Link";
import clsx from "clsx";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({

    listItem: {
        fontSize: 14
    },
    listItemActive: {
        color: theme.palette.secondary.main
    }
}));

function isActive(link) {
    const router = useRouter()
    const {pathname} = router;
    return pathname === link;
}

const DataProviderSideNavContent = () => {
    const classes = useStyles();
    return (
        <List>
            <ListItem
                button
                naked
                component={Link} href={'/data-provider'}
                className={
                    clsx(classes.listItem, isActive('/data-provider') && classes.listItemActive)
                }
            >
                <ListItemText>
                    Overview
                </ListItemText>
            </ListItem>
            <ListItem
                button
                naked
                component={Link} href={'/data-provider/data-owners'}
                className={
                    clsx(classes.listItem, isActive('/data-provider/data-owners') && classes.listItemActive)
                }
            >
                <ListItemText>
                    Data Owners
                </ListItemText>
            </ListItem>
            <ListItem
                button
                naked
                component={Link} href={'/data-provider/data-sets'}
                className={
                    clsx(classes.listItem, isActive('/data-provider/data-sets') && classes.listItemActive)
                }
            >
                <ListItemText>
                    Data Sets
                </ListItemText>
            </ListItem>
        </List>
    )
}

const ConsentManagerSideNavContent = () => {
    const classes = useStyles();

    return (
        <List>
            <ListItem
                button
                naked
                component={Link} href={'/consent-manager'}
                className={
                    clsx(classes.listItem, isActive('/consent-manager') && classes.listItemActive)
                }
            >
                <ListItemText>
                  Overview
                </ListItemText>
            </ListItem>
            <ListItem
                button
                naked
                component={Link} href={'/consent-manager/data-owners'}
                className={
                    clsx(classes.listItem, isActive('/consent-manager/data-owners') && classes.listItemActive)
                }
            >
                <ListItemText>
                  Data Owners
                </ListItemText>
            </ListItem>
        </List>
    );
}

const DataConsumerSideNavContent = () => {
    const classes = useStyles();

    return (
        <List>
            <ListItem
                button
                naked
                component={Link} href={'/data-consumer'}
                className={
                    clsx(classes.listItem, isActive('/data-consumer') && classes.listItemActive)
                }
            >
                <ListItemText>
                    Overview
                </ListItemText>
            </ListItem>
            <ListItem
                button
                naked
                component={Link} href={'/data-consumer/data-sets'}
                className={
                    clsx(classes.listItem, isActive('/data-consumer/data-sets') && classes.listItemActive)
                }
            >
                <ListItemText>
                    Data Sets
                </ListItemText>
            </ListItem>
        </List>
    );
}


export const SideNavContent = () => {
    const router = useRouter();
    const pathname = router.pathname;

    if(pathname.includes('data-provider')) {

        if(pathname === '/consent-manager/data-providers') {
            return <ConsentManagerSideNavContent/>
        }
        return <DataProviderSideNavContent/>
    } else if(router.pathname.includes('consent-manager')) {
        return <ConsentManagerSideNavContent/>
    } else {
        return <DataConsumerSideNavContent/>
    }
}