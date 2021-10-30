import React from 'react';
import { Switch, Route, NavLink, Link, useRouteMatch } from 'react-router-dom';
import { Typography, useTheme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { MainPage, Itineraire } from '../../pages/admin';
import SingleItineraire from '../../pages/admin/SingleItineraire';

export default function AdminNav() {
    const { url, path } = useRouteMatch();
    const theme = useTheme();

    const classes = useStyles(theme)();
    return (
        <div className={classes.root}>
            <aside className={classes.aside}>
                <Link to="/" className={classes.logoContainer}>
                    <Typography variant="h4" className={classes.logo}>Logo</Typography>
                </Link>
                <menu className={classes.menu}>
                    <NavLink exact activeClassName={classes.activeMenu} className={classes.menuItem} to={url}>
                        <Typography variant="caption" sx={{ color: "inherit", fontWeight: "inherit" }}>Accueil</Typography>
                    </NavLink>
                    <NavLink activeClassName={classes.activeMenu} className={classes.menuItem} to={url + "/itineraires"}>
                        <Typography variant="caption" sx={{ color: "inherit", fontWeight: "inherit" }}>Itineraires</Typography>
                    </NavLink>
                </menu>
            </aside>
            <main className={classes.main}>
                <Switch>
                    <Route path={path + "/itineraires/:idItineraire"} component={SingleItineraire} />
                    <Route path={path + "/itineraires"} component={Itineraire} />
                    <Route path={path} component={MainPage} />
                </Switch>
            </main>
        </div>
    )
}

const useStyles = theme => makeStyles({
    aside: {
        position: 'fixed',
        left: 0,
        top: 0,
        width: '100%',
        backgroundColor: '#fff',
        borderBottom: '1px solid #eaeaea',
        display: 'flex',
        alignItems: 'center',
        transition: 'background .2s',
        padding: "15px",
        zIndex: 1000,
        "& > main": {
            flex: 1,
        }
    },
    menu: {
        height: "calc(100% - 200px)",
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: "0 20px"
    },
    main: {
        padding: "20px 15px",
        marginTop: 63
    },
    menuItem: {
        padding: '0px 15px',
        display: 'block',
        color: '#444',
        "&:hover": {
            color: '#000',
        }
    },
    activeMenu: {
        color: '#000',
        fontWeight: 'bold'
    },
    [theme.breakpoints.down("xs")]: {
        main: {
            padding: '20px 10px',
        }
    }
});
