import {History} from 'history';
import {ActionCreator} from 'redux';
import * as api from '../api';
import * as routes from '../constants/routes';
import {State} from '../reducers/types';
import {LoginFailureAction, LoginRequestAction, LoginSuccessAction} from './types';

export const loginRequest: ActionCreator<LoginRequestAction> = () => ({
  type: 'LOGIN_REQUEST',
});

export const loginSuccess: ActionCreator<LoginSuccessAction> = (token: string) => ({
  payload: {
    token,
  },
  type: 'LOGIN_SUCCESS',
});

export const loginFailure: ActionCreator<LoginFailureAction> = (errorMessage: string) => ({
  payload: {
    errorMessage,
  },
  type: 'LOGIN_FAILURE',
});

const shouldLogin = (state: State) => {
  const auth = state.auth;
  return !auth.isFetching;
};

export const loginIfNeeded = (email, password, remember: boolean, history: History) => async (dispatch, getState) => {
  const state = getState();
  if (shouldLogin(state)) {
    dispatch(loginRequest());

    try {
      const response = await api.login(email, password, remember);
      // Handle local storage here and not in the reducer, to keep reducer clean of side-effects.
      localStorage.setItem('token', response.token);
      dispatch(loginSuccess(response.token));
      history.push(routes.DEFAULT);
    } catch (error) {
      dispatch(loginFailure(error.message));
    }
  }
};

export const logout = () => ({
  type: 'LOGOUT',
});

export const logoutAndRedirect = (history: History) => dispatch => {
  localStorage.removeItem('token');
  dispatch(logout());
  history.push(routes.LOGIN);
};

export const registerRequest = () => ({
  type: 'REGISTER_REQUEST',
});

export const registerSuccess = (token: string) => ({
  payload: {
    token,
  },
  type: 'REGISTER_SUCCESS',
});

export const registerFailure = (errorMessage: string) => ({
  payload: {
    errorMessage,
  },
  type: 'REGISTER_FAILURE',
});

const shouldRegister = (state: State) => {
  const auth = state.auth;
  return !auth.isFetching;
};

export const registerIfNeeded = (name, email, organizationId, password, history) => async (dispatch, getState) => {
  const state = getState();
  if (shouldRegister(state)) {
    dispatch(registerRequest());

    try {
      const response = await api.register(name, email, organizationId, password);
      // Handle local storage here and not in the reducer, to keep reducer clean of side-effects.
      localStorage.setItem('token', response.token);
      dispatch(registerSuccess(response.token));
      history.push(routes.REGISTER_RESULT);
    } catch (error) {
      dispatch(registerFailure(error.message));
    }
  }
};
