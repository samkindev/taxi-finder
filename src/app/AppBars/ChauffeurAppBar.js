import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Avatar, Button, CircularProgress, IconButton } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import { Notifications } from '@mui/icons-material';
import { Logo } from '../../components';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../firebase/api/user';
import { actions } from '../reducers/user';

export default function ChauffeurAppBar({ user }) {
    const [deconnecting, setDeconnecting] = useState(false);

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
                        <Avatar
                            style={{
                                width: 30,
                                height: 30,
                                fontSize: '0.8rem'
                            }}
                        />
                    </Box>
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
