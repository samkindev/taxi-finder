import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouteMatch, Switch, Route, Redirect } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { WelcomeChauffeur } from '../../pages';
import { getDriver } from '../firebase/api/user';
import { getUser, getLoadingState } from '../reducers/user';
import { actions, getCurrentDriver as selectDriver } from '../reducers/driver';
import MainPage from '../../pages/Chauffeur';
import ChauffeurAppBar from '../AppBars/ChauffeurAppBar';

export default function ChauffeurNavigation() {
    const user = useSelector(getUser);
    const driver = useSelector(selectDriver);
    const loadingUser = useSelector(getLoadingState);

    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();
    useEffect(() => {
        if (!loadingUser && user) {
            getDriver(user.id, (l, err, res) => {
                setLoading(l);

                if (err) {
                    console.log(err);
                    return;
                }

                if (res) {
                    dispatch(actions.setDriver({ driver: res }));
                }
            });
        }
    }, [user, loadingUser, dispatch]);

    const { path } = useRouteMatch();

    const classes = useStyles();
    console.log(user);
    if (!user) {
        return (
            <>
                <Redirect to="/login" />
            </>
        );
    }

    return (
        <div>
            {loading ?
                <div className={classes.loading}>
                    <CircularProgress color="secondary" size={70} />
                </div> :
                !driver ?
                    <WelcomeChauffeur /> :
                    <div>
                        <ChauffeurAppBar user={user} />
                        <Switch>
                            <Route path={path} render={() => {
                                return (
                                    <MainPage />
                                )
                            }} />
                        </Switch>
                    </div>
            }
        </div>
    )
}


const useStyles = makeStyles({
    loading: {
        height: '100vh',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }
})