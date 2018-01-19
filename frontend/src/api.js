import axios from 'axios';

const BACKEND_URL = 'http://localhost:8000/api/v1/';

// Use our own custom error class.
class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}

const tokenConfig = (token) => ({
    headers: {
      'Authorization': token
    }
});

const handleResponse = (response) => {
  return response.data;
};

const handleError = (error) => {
  if (error.response) {
    const actualError = error.response.data.error;
    throw new ApiError(`${actualError.title} - ${actualError.details}`, error.response.status);
  }
  throw new ApiError(error.message, 500);
};

export const login = (email, password, remember) =>
  axios.post(BACKEND_URL + "user/login", {
    email,
    password,
    remember
  }).then(handleResponse).catch(handleError);

export const validateToken = (token) =>
  axios.post(BACKEND_URL + "user/validate", {
    token
  }).then(handleResponse).catch(handleError);

export const register = (name, email, password) =>
  axios.post(BACKEND_URL + "user/register", {
    name,
    email,
    password
  }).then(handleResponse).catch(handleError);
