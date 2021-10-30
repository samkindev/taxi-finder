import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getConnectionState } from '../../redux/reducers/user';

const ProtectedRoute = (props) => {
    const { path, component, ...other } = props;
    const isConnected = useSelector(getConnectionState);

    if (isConnected) {
        return (
            <>
                <Route path={path} component={component} {...other} />
            </>
        );
    }

    return (
        <Redirect to="/" />
    )
}

ProtectedRoute.propTypes = {
    path: PropTypes.string,
    component: PropTypes.any
}

export default ProtectedRoute;
