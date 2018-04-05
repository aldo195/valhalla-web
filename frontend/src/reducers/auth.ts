import jwtDecode from 'jwt-decode';
import * as _ from 'lodash';
import {Reducer} from 'redux';
import {AuthState, State} from './types';

export interface TokenDetails {
  readonly email: string;
  readonly role: string;
  readonly organization_id: number;
}

const token = localStorage.getItem('token');
const decodedToken: TokenDetails | null = token ? jwtDecode<TokenDetails>(token) : null;

const initialState: AuthState = {
  avatar: null,
  email: decodedToken ? decodedToken.email : null,
  errorMessage: null,
  isAuthenticated: !_.isNil(token),
  isFetching: false,
  organizationId: decodedToken ? decodedToken.organization_id : null,
  role: decodedToken ? decodedToken.role : null,
  token,
};

export const auth: Reducer<AuthState> = (state: AuthState = initialState, action) => {
  switch (action.type) {
    case 'REGISTER_REQUEST':
    case 'LOGIN_REQUEST':
      return {
        ...state,
        errorMessage: null,
        isAuthenticated: false,
        isFetching: true,
      };
    case 'REGISTER_SUCCESS':
    case 'LOGIN_SUCCESS':
      const decodedToken = jwtDecode<TokenDetails>(action.token);
      return {
        avatar: null,
        email: decodedToken.email,
        errorMessage: null,
        isAuthenticated: true,
        isFetching: false,
        organizationId: decodedToken.organization_id,
        role: decodedToken.role,
        token: action.token,
      };
    case 'REGISTER_FAILURE':
    case 'LOGIN_FAILURE':
      return {
        avatar: null,
        email: null,
        errorMessage: action.errorMessage,
        isAuthenticated: false,
        isFetching: false,
        organizationId: null,
        role: null,
        token: null,
      };
    case 'LOGOUT':
      return {
        avatar: null,
        email: null,
        errorMessage: null,
        isAuthenticated: false,
        isFetching: false,
        organizationId: null,
        role: null,
        token: null,
      };
    default:
      return state;
  }
};

export const getAuthDetails = (state: State) => {
  const {auth} = state;
  return {
    avatar: auth.avatar,
    email: auth.email,
    isAuthenticated: auth.isAuthenticated,
    organizationId: auth.organizationId,
    role: auth.role,
    token: auth.token,
  };
};

export const getAuthStatus = (state: State) => {
  return {
    errorMessage: state.auth.errorMessage,
    isAuthenticated: state.auth.isAuthenticated,
    isFetching: state.auth.isFetching,
  };
};
