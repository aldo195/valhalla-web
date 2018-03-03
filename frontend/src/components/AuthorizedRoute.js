// @flow
import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import * as api from '../api';
import * as types from '../types';
import {getAuthDetails} from '../reducers/auth';
import {bindActionCreators} from 'redux';
import {loginSuccess} from '../actions/auth';
import {connect} from 'react-redux';

type Props = {
  component: () => void,
  render: ({}) => void,
  roles: Array<string>,
  redirectPath: string,
  auth: types.AuthDetails,
  loginSuccess: string => types.ThunkAction,
};

class AuthorizedRoute extends React.Component<Props> {
  componentWillMount() {
    this.checkAuth();
  }

  componentWillReceiveProps(nextProps) {
    this.checkAuth(nextProps);
  }

  checkAuth(props = this.props) {
    if (!props.auth.isAuthenticated) {
      const token = localStorage.getItem('token');
      if (token) {
        api.validateToken(token).then(() => {
          this.props.loginSuccess(token);
        });
      }
    }
  }

  render() {
    const {auth, component: Component, render, roles, redirectPath, ...rest} = this.props;
    if (auth.isAuthenticated && roles.indexOf(auth.role) !== -1) {
      return <Route {...rest} render={props => (Component ? <Component {...props} /> : render(props))} />;
    }
    return <Route {...rest} render={() => <Redirect to={{pathname: redirectPath}} />} />;
  }
}

function mapStateToProps(state) {
  return {
    auth: getAuthDetails(state),
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      loginSuccess,
    },
    dispatch,
  );
}

AuthorizedRoute = connect(mapStateToProps, mapDispatchToProps)(AuthorizedRoute);
export {AuthorizedRoute};
