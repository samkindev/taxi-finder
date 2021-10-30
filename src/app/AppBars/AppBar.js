import React from 'react';
import { Link, NavLink, useHistory } from 'react-router-dom';
import { Typography, Button, Avatar, Hidden, IconButton } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { MenuSharp } from '@mui/icons-material';

export default function AppBar({ user }) {
    const history = useHistory();
    const goToLogin = () => {
        history.push("/login");
    };


    const classes = useStyles();
    return (
        <div className={classes.root}>
            <div className={classes.toolBar}>
                <Link to="/" className={classes.logoContainer}>
                    <Typography variant="h4" className={classes.logo}>Logo</Typography>
                </Link>
                <Hidden smDown>
                    <menu>
                        <NavLink to="/">
                            <Typography variant="navLink">A propos</Typography>
                        </NavLink>
                        <NavLink to="/">
                            <Typography variant="navLink">Comment ça marche</Typography>
                        </NavLink>
                        {user ?
                            <Avatar
                                style={{
                                    width: 30,
                                    height: 30,
                                    fontSize: '0.8rem'
                                }}
                            ></Avatar> :
                            <Button
                                variant="outlined"
                                color="default"
                                size="small"
                                onClick={goToLogin}
                                sx={{
                                    fontSize: '0.8rem',
                                    borderRadius: 5
                                }}
                            >
                                Connexion
                            </Button>
                        }
                    </menu>
                </Hidden>
                <Hidden smUp>
                    <IconButton>
                        <MenuSharp fontSize="medium" color="default" />
                    </IconButton>
                </Hidden>
            </div>
        </div>
    )
}

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: '#fff',
        boxShadow: '0px 0px 5px #eaeaea'
    },
    toolBar: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 20px',
        maxWidth: 1100,
        margin: 'auto',
        "& > menu": {
            display: 'flex',
            alignItems: 'center',
            "& > a": {
                padding: '0 10px',
                "& > span": {
                    transition: 'color .2s',
                },
                "&:hover span": {
                    color: theme.palette.primary.main
                }
            }
        }
    }
}));
