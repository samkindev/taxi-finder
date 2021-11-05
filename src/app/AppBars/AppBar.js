import React, { useState } from 'react';
import { Link, NavLink, useHistory } from 'react-router-dom';
import { Typography, Button, Avatar, Hidden, IconButton, CircularProgress } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { MenuSharp } from '@mui/icons-material';
import { logoutUser } from '../firebase/api/user';
import { useDispatch } from 'react-redux';
import { actions } from '../reducers/user';
import { Box } from '@mui/system';
import { Logo } from '../../components';

export default function AppBar({ user }) {
    const [deconnecting, setDeconnecting] = useState(false);
    const history = useHistory();
    const goToLogin = () => {
        history.push("/login");
    };

    const dispatch = useDispatch();
    const handleDeconnection = () => {
        logoutUser((l, err, res) => {
            setDeconnecting(l);
            console.log(res);
            if (err) {
                console.log(err);
                return;
            }

            if (res) {
                dispatch(actions.disconnectUser());
            }
        });
    };

    const classes = useStyles();
    return (
        <div className={classes.root}>
            <div className={classes.toolBar}>
                <Link to="/" className={classes.logoContainer}>
                    <Logo width={80} />
                </Link>
                {/* <Hidden smDown> */}
                <menu>
                    {/* <NavLink to="/">
                            <Typography variant="navLink">A propos</Typography>
                        </NavLink>
                        <NavLink to="/">
                            <Typography variant="navLink">Comment ça marche</Typography>
                        </NavLink> */}
                    {user ?
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Button
                                variant="text"
                                color="default"
                                size="small"
                                onClick={handleDeconnection}
                                sx={{ marginRight: 1 }}
                            >
                                {deconnecting ?
                                    <CircularProgress size={12} color="default" /> :
                                    'Decconexion'
                                }
                            </Button>
                            <Avatar
                                style={{
                                    width: 30,
                                    height: 30,
                                    fontSize: '0.8rem'
                                }}
                            ></Avatar>
                        </Box> :
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
                {/* </Hidden> */}
                {/* <Hidden smUp>
                    <IconButton>
                        <MenuSharp fontSize="medium" color="default" />
                    </IconButton>
                </Hidden> */}
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
