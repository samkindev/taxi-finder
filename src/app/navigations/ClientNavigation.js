import React from 'react';
import { useRouteMatch, Switch, Route } from 'react-router-dom';
import { ClientMainPage } from '../../pages';
import ClientAppBar from '../AppBars/ClientAppBar';

export default function ClientNavigation() {
    const { path } = useRouteMatch();
    return (
        <div>
            <ClientAppBar />
            <Switch>
                <Route path={path} component={ClientMainPage} />
            </Switch>
        </div>
    )
}
