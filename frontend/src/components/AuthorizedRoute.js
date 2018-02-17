import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import * as api from '../api';
import {getAuthDetails} from '../reducers/auth';
import {bindActionCreators} from 'redux';
import {loginSuccess} from '../actions/auth';
import {connect} from 'react-redux';

class AuthorizedRoute extends React.Component {
  componentWillMount() {
    this.checkAuth();
  }

  componentWillReceiveProps(nextProps) {
    this.checkAuth(nextProps);
  }

  checkAuth(props = this.props) {
    if (!props.isAuthenticated) {
      const token = localStorage.getItem('token');
      if (token) {
        api.validateToken(token).then(() => {
          this.props.loginSuccess(token);
        });
      }
    }
  }

  render() {
    const {component: Component, render, roles, redirectPath, ...rest} = this.props;
    if (this.props.isAuthenticated && roles.indexOf(this.props.role) !== -1) {
      return <Route {...rest} render={props => (Component ? <Component {...props} /> : render(props))} />;
    }
    return <Route {...rest} render={() => <Redirect to={{pathname: redirectPath}} />} />;
  }
}

function mapStateToProps(state) {
  return getAuthDetails(state);
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
