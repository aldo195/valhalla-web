import axios from 'axios';
import {store} from './store';
import history from './history';
import {logoutAndRedirect} from './actions/auth';

let BACKEND_URL = '/api/v1';

// Use our own custom error class.
class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}

const tokenConfig = token => ({
  headers: {
    Authorization: token,
  },
});

const handleResponse = response => {
  return response.data;
};

const handleError = error => {
  if (error.response) {
    const status = error.response.status;

    if (status === 401) {
      store.dispatch(logoutAndRedirect(history));
    }

    const actualError = error.response.data.error;
    if (actualError) {
      throw new ApiError(`${actualError.title} - ${actualError.details}`, status);
    }
  }
  throw new ApiError(error.message, 500);
};

export const login = (email, password, remember) =>
  axios
    .post(`${BACKEND_URL}/user/login`, {
      email,
      password,
      remember,
    })
    .then(handleResponse)
    .catch(handleError);

export const validateToken = token =>
  axios
    .post(`${BACKEND_URL}/user/validate`, {
      token,
    })
    .then(handleResponse)
    .catch(handleError);

export const register = (name, email, organizationId, password) =>
  axios
    .post(`${BACKEND_URL}/user`, {
      name,
      email,
      organizationId,
      password,
    })
    .then(handleResponse)
    .catch(handleError);

export const loadOrganizations = token =>
  axios
    .get(`${BACKEND_URL}/organization`, tokenConfig(token))
    .then(handleResponse)
    .catch(handleError);

export const getOrganization = (organizationId, token) =>
  axios
    .get(`${BACKEND_URL}/organization/${organizationId}`, tokenConfig(token))
    .then(handleResponse)
    .catch(handleError);

export const loadRules = token =>
  axios
    .get(`${BACKEND_URL}/rule`, tokenConfig(token))
    .then(handleResponse)
    .catch(handleError);

export const loadNotifications = token =>
  axios
    .get(`${BACKEND_URL}/notification`, tokenConfig(token))
    .then(handleResponse)
    .catch(handleError);

export const clearNotifications = token =>
  axios
    .delete(`${BACKEND_URL}/notification`, tokenConfig(token))
    .then(handleResponse)
    .catch(handleError);
