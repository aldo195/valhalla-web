import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loginSuccess } from '../actions/auth';
import * as routes from "../constants/routes";
import * as api from '../api';
import {getAuthDetails} from "../reducers/auth";
import {withRouter} from "react-router-dom";


export function requireAuthentication(Component) {
  class AuthenticatedComponent extends React.Component {
    componentWillMount() {
      this.checkAuth();
    }

    componentWillReceiveProps(nextProps) {
      this.checkAuth(nextProps);
    }

    checkAuth(props = this.props) {
      if (!props.isAuthenticated) {
        const token = localStorage.getItem('token');
        if (!token) {
          this.props.history.push(routes.LOGIN);
        } else {
          api.validateToken(token).then(
            response => {
              this.props.loginSuccess(token);
            },
            error => {
              this.props.history.push(routes.LOGIN);
            }
          );
        }
      }
    }

    render() {
      return (
        <div>
          {this.props.isAuthenticated
            ? <Component {...this.props} />
            : null
          }
        </div>
      );
    }
  }

  function mapStateToProps(state) {
    return getAuthDetails(state);
  }

  function mapDispatchToProps(dispatch) {
    return bindActionCreators({
      loginSuccess
    }, dispatch);
  }

  return withRouter(connect(mapStateToProps, mapDispatchToProps)(AuthenticatedComponent));
}
