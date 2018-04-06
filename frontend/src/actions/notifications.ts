import {ActionCreator, Dispatch} from 'redux';
import * as api from '../api';
import {State} from '../reducers/types';
import * as actionTypes from './types';

export const loadNotificationsRequest: ActionCreator<actionTypes.LoadNotificationsRequestAction> = () => ({
  type: 'LOAD_NOTIFICATIONS_REQUEST',
});

export const loadNotificationsSuccess: ActionCreator<actionTypes.LoadNotificationsSuccessAction> = (
  response: actionTypes.LoadNotificationsSuccessPayload,
) => ({
  payload: {
    response,
  },
  type: 'LOAD_NOTIFICATIONS_SUCCESS',
});

export const loadNotificationsFailure: ActionCreator<actionTypes.LoadNotificationsFailureAction> = (
  errorMessage: string,
) => ({
  payload: {
    errorMessage,
  },
  type: 'LOAD_NOTIFICATIONS_FAILURE',
});

const shouldLoadNotifications = (state: State) => {
  const notifications = state.notifications;
  return !notifications.isFetching;
};

export const loadNotificationsIfNeeded = (token: string) => async (
  dispatch: Dispatch<State>,
  getState: actionTypes.GetState,
) => {
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

export const clearNotificationsRequest: ActionCreator<actionTypes.ClearNotificationsRequestAction> = () => ({
  type: 'CLEAR_NOTIFICATIONS_REQUEST',
});

export const clearNotificationsSuccess: ActionCreator<actionTypes.ClearNotificationsSuccessAction> = () => ({
  type: 'CLEAR_NOTIFICATIONS_SUCCESS',
});

export const clearNotificationsFailure: ActionCreator<actionTypes.ClearNotificationsFailureAction> = (
  errorMessage: string,
) => ({
  payload: {
    errorMessage,
  },
  type: 'CLEAR_NOTIFICATIONS_FAILURE',
});

const shouldClearNotifications = (state: State) => {
  const notifications = state.notifications;
  return notifications.notifications.length > 0;
};

export const clearNotificationsIfNeeded = (token: string) => async (
  dispatch: Dispatch<State>,
  getState: actionTypes.GetState,
) => {
  const state = getState();
  if (shouldClearNotifications(state)) {
    dispatch(clearNotificationsRequest());

    try {
      await api.clearNotifications(token);
      dispatch(clearNotificationsSuccess());
    } catch (error) {
      dispatch(clearNotificationsFailure(error.message));
    }
  }
};
