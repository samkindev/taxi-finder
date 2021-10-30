import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AppBar from '../AppBars/AppBar';
import { HomePage } from '../../pages';
import { getUser } from '../reducers/user';

export default function MainNav() {
    const user = useSelector(getUser);
    return (
        <div>
            <AppBar user={user} />
            <Switch>
                <Route path="/" component={HomePage} />
            </Switch>
        </div>
    )
}
