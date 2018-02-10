import jwtDecode from 'jwt-decode';
import * as actionTypes from '../constants/actionTypes';
import * as _ from 'lodash';

export const auth = (
  state = {
    isAuthenticated: !_.isNil(localStorage.getItem('token')),
    token: localStorage.getItem('token'),
    email: localStorage.getItem('token') ? jwtDecode(localStorage.getItem('token')).email : null,
    isFetching: false,
    errorMessage: null,
  },
  action,
) => {
  switch (action.type) {
    case actionTypes.REGISTER_REQUEST:
    case actionTypes.LOGIN_REQUEST:
      return {
        ...state,
        isFetching: true,
        isAuthenticated: false,
        errorMessage: null,
      };
    case actionTypes.REGISTER_SUCCESS:
    case actionTypes.LOGIN_SUCCESS:
      return {
        isFetching: false,
        isAuthenticated: true,
        token: action.token,
        email: jwtDecode(action.token).email,
        errorMessage: null,
      };
    case actionTypes.REGISTER_FAILURE:
    case actionTypes.LOGIN_FAILURE:
      return {
        isAuthenticated: false,
        isFetching: false,
        token: null,
        email: null,
        errorMessage: action.errorMessage,
      };
    case actionTypes.LOGOUT:
      return {
        isAuthenticated: false,
        isFetching: false,
        token: null,
        email: null,
        errorMessage: null,
      };
    default:
      return state;
  }
};

export const getAuthDetails = state => {
  return {
    token: state.auth.token,
    email: state.auth.email,
    isAuthenticated: state.auth.isAuthenticated,
  };
};

export const getAuthStatus = state => {
  return {
    isFetching: state.auth.isFetching,
    errorMessage: state.auth.errorMessage,
  };
};
