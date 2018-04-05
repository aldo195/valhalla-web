import axios from 'axios';
import {logoutAndRedirect} from './actions/auth';
import history from './history';
import {store} from './store';

const BACKEND_URL = '/api/v1';

// Use our own custom error class.
class ApiError extends Error {
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

const tokenConfig = (token: string) => ({
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

export const login = (email: string, password: string, remember: boolean) =>
  axios
    .post(`${BACKEND_URL}/user/login`, {
      email,
      password,
      remember,
    })
    .then(handleResponse)
    .catch(handleError);

export const validateToken = (token: string) =>
  axios
    .post(`${BACKEND_URL}/user/validate`, {
      token,
    })
    .then(handleResponse)
    .catch(handleError);

export const register = (name: string, email: string, organizationId: number, password: string) =>
  axios
    .post(`${BACKEND_URL}/user`, {
      email,
      name,
      organizationId,
      password,
    })
    .then(handleResponse)
    .catch(handleError);

export const loadOrganizations = (token: string) =>
  axios
    .get(`${BACKEND_URL}/organization`, tokenConfig(token))
    .then(handleResponse)
    .catch(handleError);

export const getOrganization = (organizationId: number, token: string) =>
  axios
    .get(`${BACKEND_URL}/organization/${organizationId}`, tokenConfig(token))
    .then(handleResponse)
    .catch(handleError);

export const loadRules = (token: string) =>
  axios
    .get(`${BACKEND_URL}/rule`, tokenConfig(token))
    .then(handleResponse)
    .catch(handleError);

export const loadNotifications = (token: string) =>
  axios
    .get(`${BACKEND_URL}/notification`, tokenConfig(token))
    .then(handleResponse)
    .catch(handleError);

export const clearNotifications = (token: string) =>
  axios
    .delete(`${BACKEND_URL}/notification`, tokenConfig(token))
    .then(handleResponse)
    .catch(handleError);
