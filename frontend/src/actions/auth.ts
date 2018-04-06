import {History} from 'history';
import {ActionCreator, Dispatch} from 'redux';
import * as api from '../api';
import * as routes from '../constants/routes';
import {State} from '../reducers/types';
import * as actionTypes from './types';

export const loginRequest: ActionCreator<actionTypes.LoginRequestAction> = () => ({
  type: 'LOGIN_REQUEST',
});

export const loginSuccess: ActionCreator<actionTypes.LoginSuccessAction> = (token: string) => ({
  payload: {
    token,
  },
  type: 'LOGIN_SUCCESS',
});

export const loginFailure: ActionCreator<actionTypes.LoginFailureAction> = (errorMessage: string) => ({
  payload: {
    errorMessage,
  },
  type: 'LOGIN_FAILURE',
});

const shouldLogin = (state: State) => {
  const auth = state.auth;
  return !auth.isFetching;
};

export const loginIfNeeded = (email: string, password: string, remember: boolean, history: History) => async (
  dispatch: Dispatch<State>,
  getState: actionTypes.GetState,
) => {
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

export const logout: ActionCreator<actionTypes.LogoutAction> = () => ({
  type: 'LOGOUT',
});

export const logoutAndRedirect = (history: History) => (dispatch: Dispatch<State>) => {
  localStorage.removeItem('token');
  dispatch(logout());
  history.push(routes.LOGIN);
};

export const registerRequest: ActionCreator<actionTypes.RegisterRequestAction> = () => ({
  type: 'REGISTER_REQUEST',
});

export const registerSuccess: ActionCreator<actionTypes.RegisterSuccessAction> = (token: string) => ({
  payload: {
    token,
  },
  type: 'REGISTER_SUCCESS',
});

export const registerFailure: ActionCreator<actionTypes.RegisterFailureAction> = (errorMessage: string) => ({
  payload: {
    errorMessage,
  },
  type: 'REGISTER_FAILURE',
});

const shouldRegister = (state: State) => {
  const auth = state.auth;
  return !auth.isFetching;
};

export const registerIfNeeded = (
  name: string,
  email: string,
  organizationId: number,
  password: string,
  history: History,
) => async (dispatch: Dispatch<State>, getState: actionTypes.GetState) => {
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
