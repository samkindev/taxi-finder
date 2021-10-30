import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getConnectedState } from '../../app/reducers/user';

const ForbidenRoute = (props) => {
    const { path, component, ...other } = props;
    const isConnected = useSelector(getConnectedState);

    // const history = useHistory();
    if (isConnected) {
        return (
            <>
                <Redirect to="/" />
            </>
        )
    } else {
        return (
            <>
                <Route path={path} component={component} {...other} />
            </>
        );
    }
}

ForbidenRoute.propTypes = {
    path: PropTypes.string,
    component: PropTypes.any
}

export default ForbidenRoute;
