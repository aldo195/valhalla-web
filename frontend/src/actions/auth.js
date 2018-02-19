import * as api from '../api';
import * as actionTypes from '../constants/actionTypes';
import * as routes from '../constants/routes';

export const loginRequest = () => ({
  type: actionTypes.LOGIN_REQUEST,
});

export const loginSuccess = token => ({
  type: actionTypes.LOGIN_SUCCESS,
  token,
});

export const loginFailure = errorMessage => ({
  type: actionTypes.LOGIN_FAILURE,
  errorMessage,
});

const shouldLogin = state => {
  const auth = state.auth;
  return !auth.isFetching;
};

export const loginIfNeeded = (email, password, remember) => (dispatch, getState) => {
  const state = getState();
  if (shouldLogin(state)) {
    dispatch(loginRequest());

    api.login(email, password, remember).then(
      response => {
        // Handle local storage here and not in the reducer, to keep reducer clean of side-effects.
        localStorage.setItem('token', response.token);
        dispatch(loginSuccess(response.token));
      },
      error => {
        dispatch(loginFailure(error.message));
      },
    );
  }
};

export const logout = () => ({
  type: actionTypes.LOGOUT,
});

export const logoutAndRedirect = history => dispatch => {
  localStorage.removeItem('token');
  dispatch(logout());
  history.push(routes.LOGIN);
};

export const registerRequest = () => ({
  type: actionTypes.REGISTER_REQUEST,
});

export const registerSuccess = token => ({
  type: actionTypes.REGISTER_SUCCESS,
  token,
});

export const registerFailure = errorMessage => ({
  type: actionTypes.REGISTER_FAILURE,
  errorMessage,
});

const shouldRegister = state => {
  const auth = state.auth;
  return !auth.isFetching;
};

export const registerIfNeeded = (name, email, organizationId, password) => (dispatch, getState) => {
  const state = getState();
  if (shouldRegister(state)) {
    dispatch(registerRequest());

    api.register(name, email, organizationId, password).then(
      response => {
        // Handle local storage here and not in the reducer, to keep reducer clean of side-effects.
        localStorage.setItem('token', response.token);
        dispatch(registerSuccess(response.token));
      },
      error => {
        dispatch(registerFailure(error.message));
      },
    );
  }
};
