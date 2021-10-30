import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Typography, Avatar } from '@mui/material';
import { makeStyles } from '@mui/styles';

export default function ClientAppBar() {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <div className={classes.toolBar}>
                <Link to="/" className={classes.logoContainer}>
                    <Typography variant="h4" className={classes.logo}>Logo</Typography>
                </Link>
                <menu>
                    <NavLink to="/">
                        <Typography variant="navLink">Historique</Typography>
                    </NavLink>
                    <NavLink to="/">
                        <Typography variant="navLink">Comment ça marche</Typography>
                    </NavLink>
                    <Avatar
                        style={{
                            width: 30,
                            height: 30,
                            fontSize: '0.8rem'
                        }}
                    >S</Avatar>
                </menu>
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
