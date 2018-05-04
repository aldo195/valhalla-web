import React from 'react';
import {connect} from 'react-redux';
import {RouteComponentProps, RouteProps} from 'react-router';
import {Redirect, Route} from 'react-router-dom';
import {bindActionCreators, Dispatch} from 'redux';
import {LoginActions} from '../actions/auth';
import * as api from '../api';
import {getAuthDetails} from '../reducers/auth';
import {AuthDetails, State} from '../reducers/types';

interface OwnProps extends RouteProps {
  redirectPath: string;
  render: ((props: RouteComponentProps<any>) => React.ReactNode);
  roles: ReadonlyArray<string>;
}

interface DispatchProps {
  loginSuccess: typeof LoginActions.loginSuccess;
}

interface StateProps {
  auth: AuthDetails;
}

type AuthorizedRouteProps = OwnProps & DispatchProps & StateProps;

class AuthorizedRoute extends React.Component<AuthorizedRouteProps> {
  componentWillMount() {
    this.checkAuth();
  }

  componentWillReceiveProps(nextProps: AuthorizedRouteProps) {
    this.checkAuth(nextProps);
  }

  checkAuth(props: AuthorizedRouteProps = this.props) {
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
    if (auth.isAuthenticated && auth.role && roles.indexOf(auth.role) !== -1) {
      return <Route {...rest} render={props => (Component ? <Component {...props} /> : render(props))} />;
    }
    return <Route {...rest} render={() => <Redirect to={{pathname: redirectPath}} />} />;
  }
}

const mapStateToProps = (state: State) => {
  return {
    auth: getAuthDetails(state),
  };
};

const mapDispatchToProps = (dispatch: Dispatch<State>) => {
  return bindActionCreators(
    {
      loginSuccess: LoginActions.loginSuccess,
    },
    dispatch,
  );
};

const ConnectedAuthorizedRoute = connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps)(
  AuthorizedRoute,
);
export {ConnectedAuthorizedRoute as AuthorizedRoute};
