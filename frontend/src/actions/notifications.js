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

export const loadNotificationsIfNeeded = token => async (dispatch, getState) => {
  const state = getState();
  if (shouldLoadNotifications(state)) {
    dispatch(loadNotificationsRequest());

    try {
      const response = await api.loadNotifications(token);
      dispatch(loadNotificationsSuccess(response));
    } catch (error) {
      dispatch(loadNotificationsFailure(error.message));
    }
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

export const clearNotificationsIfNeeded = token => async (dispatch, getState) => {
  const state = getState();
  if (shouldClearNotifications(state)) {
    dispatch(clearNotificationsRequest());

    try {
      const response = await api.clearNotifications(token);
      dispatch(clearNotificationsSuccess(response));
    } catch (error) {
      dispatch(clearNotificationsFailure(error.message));
    }
  }
};
