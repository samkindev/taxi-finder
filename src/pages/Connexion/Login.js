import React from 'react';
import { useSelector } from 'react-redux';
import { LoginForm } from '../../components';
import { makeStyles } from '@mui/styles';
import { Box, CircularProgress, Typography } from '@mui/material';
import { getUser, getLoadingState } from '../../app/reducers/user';
import globalStyles from '../../styles/globalStyles';
import { Link } from 'react-router-dom';

export default function Login() {
    const user = useSelector(getUser);
    const loading = useSelector(getLoadingState);

    const globalClasses = globalStyles();
    const classes = useStyles();

    return (
        <div className={classes.root}>
            {loading ?
                <Box width="100%" height="100vh" className={globalClasses.centerFlex}>
                    <CircularProgress color="secondary" size={70} />
                </Box> :
                <div>
                    <Box display="flex" justifyContent="center" mb={3}>
                        <Link to="/" className={classes.logoContainer}>
                            <Typography variant="h4" className={classes.logo}>Logo</Typography>
                        </Link>
                    </Box>
                    <LoginForm />
                </div>
            }
        </div>
    )
}

const useStyles = makeStyles({
    root: {
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
    },
    logo: {
        textAlign: 'center!important'
    }
});
