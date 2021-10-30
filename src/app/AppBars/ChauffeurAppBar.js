import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Typography, Avatar, IconButton } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Notifications } from '@mui/icons-material';

export default function ChauffeurAppBar({ user }) {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <div className={classes.toolBar}>
                <Link to="/" className={classes.logoContainer}>
                    <Typography variant="h4" className={classes.logo}>Logo</Typography>
                </Link>
                <menu>
                    <IconButton>
                        <Notifications fontSize="medium" />
                    </IconButton>
                    <Avatar
                        style={{
                            width: 30,
                            height: 30,
                            fontSize: '0.8rem'
                        }}
                    />
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
            "& > *:not(:last-child)": {
                marginRight: '10px',
            }
        }
    }
}));
