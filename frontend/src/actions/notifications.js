import * as api from '../api';
import * as actionTypes from '../constants/actionTypes';

export const loadNotificationsRequest = () => ({
  type: actionTypes.LOAD_NOTIFICATIONS_REQUEST,
});

export const loadNotificationsSuccess = response => ({
  type: actionTypes.LOAD_NOTIFICATIONS_SUCCESS,
  response,
});

export const loadNotificationsFailure = errorMessage => ({
  type: actionTypes.LOAD_NOTIFICATIONS_FAILURE,
  errorMessage,
});

const shouldLoadNotifications = state => {
  const notifications = state.notifications;
  return !notifications.isFetching;
};

export const loadNotificationsIfNeeded = token => (dispatch, getState) => {
  const state = getState();
  if (shouldLoadNotifications(state)) {
    dispatch(loadNotificationsRequest());

    api.loadNotifications(token).then(
      response => dispatch(loadNotificationsSuccess(response)),
      error => {
        dispatch(loadNotificationsFailure(error.message));
      },
    );
  }
};

export const clearNotificationsRequest = () => ({
  type: actionTypes.CLEAR_NOTIFICATIONS_REQUEST,
});

export const clearNotificationsSuccess = response => ({
  type: actionTypes.CLEAR_NOTIFICATIONS_SUCCESS,
  response,
});

export const clearNotificationsFailure = errorMessage => ({
  type: actionTypes.CLEAR_NOTIFICATIONS_FAILURE,
  errorMessage,
});

const shouldClearNotifications = state => {
  const notifications = state.notifications;
  return notifications.notifications.length > 0;
};

export const clearNotificationsIfNeeded = token => (dispatch, getState) => {
  const state = getState();
  if (shouldClearNotifications(state)) {
    dispatch(clearNotificationsRequest());

    api.clearNotifications(token).then(
      response => dispatch(clearNotificationsSuccess(response)),
      error => {
        dispatch(clearNotificationsFailure(error.message));
      },
    );
  }
};
