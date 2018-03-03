import jwtDecode from 'jwt-decode';
import * as actionTypes from '../constants/actionTypes';
import * as _ from 'lodash';

const token = localStorage.getItem('token');
const decodedToken = token ? jwtDecode(token) : null;

export const auth = (
  state = {
    isAuthenticated: !_.isNil(token),
    token: token,
    email: decodedToken ? decodedToken.email : null,
    role: decodedToken ? decodedToken.role : null,
    organizationId: decodedToken ? decodedToken.organization_id : null,
    avatar: null,
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
      const decodedToken = jwtDecode(action.token);
      return {
        isFetching: false,
        isAuthenticated: true,
        token: action.token,
        email: decodedToken.email,
        role: decodedToken.role,
        organizationId: decodedToken.organization_id,
        errorMessage: null,
      };
    case actionTypes.REGISTER_FAILURE:
    case actionTypes.LOGIN_FAILURE:
      return {
        isAuthenticated: false,
        isFetching: false,
        token: null,
        email: null,
        role: null,
        organizationId: null,
        errorMessage: action.errorMessage,
      };
    case actionTypes.LOGOUT:
      return {
        isAuthenticated: false,
        isFetching: false,
        token: null,
        email: null,
        role: null,
        organizationId: null,
        errorMessage: null,
      };
    default:
      return state;
  }
};

export const getAuthDetails = state => {
  const {auth} = state;
  return {
    token: auth.token,
    email: auth.email,
    role: auth.role,
    organizationId: auth.organizationId,
    avatar: auth.avatar,
    isAuthenticated: auth.isAuthenticated,
  };
};

export const getAuthStatus = state => {
  return {
    isFetching: state.auth.isFetching,
    isAuthenticated: state.auth.isAuthenticated,
    errorMessage: state.auth.errorMessage,
  };
};
