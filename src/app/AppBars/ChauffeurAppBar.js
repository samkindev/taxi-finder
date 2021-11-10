import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, CircularProgress, IconButton, useTheme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import MenuIcon from '@mui/icons-material/Menu';
import { Notifications } from '@mui/icons-material';
import { Logo } from '../../components';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../firebase/api/user';
import { actions } from '../reducers/user';

export default function ChauffeurAppBar({ user, toggleManu }) {
    const [deconnecting, setDeconnecting] = useState(false);

    const dispatch = useDispatch();
    const handleDeconnection = () => {
        logoutUser((l, err, res) => {
            setDeconnecting(l);
            if (err) {
                console.log(err);
                return;
            }

            if (res) {
                dispatch(actions.disconnectUser());
            }
        });
    };
    const theme = useTheme();
    const classes = useStyles(theme)();
    return (
        <div className={classes.root}>
            <div className={classes.toolBar}>
                <Box display="flex" alignItems="center">
                    <IconButton className={classes.menuBtn} onClick={toggleManu}>
                        <MenuIcon />
                    </IconButton>                
                    <Link to="/">
                        <Logo />
                    </Link>
                </Box>
                <menu>
                    <IconButton>
                        <Notifications fontSize="medium" />
                    </IconButton>
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
                    </Box>
                </menu>
            </div>
        </div>
    )
}

const useStyles = theme => makeStyles({
    root: {
        backgroundColor: '#ffffff57',
        backdropFilter: 'blur(10px)',
        boxShadow: '0px 0px 0px #eaeaea',
        position: 'fixed',
        top: 0,
        right: 0,
        width: 'calc(100% - 300px)',
        zIndex: 10
    },
    toolBar: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 20px',
        maxWidth: 1100,
        margin: 'auto',
        "& > menu": {
            flexGrow: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            "& > *:not(:last-child)": {
                marginRight: '10px',
            }
        }
    },
    menuBtn: {
        display: 'none!important',
        marginRight: "10px!important"
    },
    [theme.breakpoints.down('sm').replace('599.95px', '700px')]: {
        root: {
            left: 0,
            width: '100%'
        },
        menuBtn: {
            display: 'inline-flex!important',
        },
        toolBar: {
            padding: "10px 10px"
        }
    }
});
