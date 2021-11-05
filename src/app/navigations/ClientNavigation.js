import React from 'react';
import { useSelector } from 'react-redux';
import { useRouteMatch, Switch, Route, Redirect } from 'react-router-dom';
import { ClientCommandPage, ClientMainPage } from '../../pages';
import ClientAppBar from '../AppBars/ClientAppBar';
import { getCurrentUser } from '../firebase/api/user';

export default function ClientNavigation() {
    const user = useSelector(getCurrentUser);
    const { path } = useRouteMatch();

    if (!user) {
        return (
            <>
                <Redirect to="/login" />
            </>
        )
    }
    return (
        <div>
            <ClientAppBar />
            <Switch>
                <Route path={path + "/commander-taxi"} component={ClientCommandPage} />
                <Route path={path} component={ClientMainPage} />
            </Switch>
        </div>
    )
}
