import {Reducer} from 'redux';
import {NotificationsState, State} from './types';

export const initialState: NotificationsState = {
  errorMessage: null,
  isFetching: false,
  notifications: [],
};

export const notifications: Reducer<NotificationsState> = (state: NotificationsState = initialState, action) => {
  switch (action.type) {
    case 'LOAD_NOTIFICATIONS_REQUEST':
      return {
        ...state,
        errorMessage: null,
        isFetching: true,
      };
    case 'LOAD_NOTIFICATIONS_SUCCESS':
      return {
        errorMessage: null,
        isFetching: false,
        notifications: action.response.notifications,
      };
    case 'LOAD_NOTIFICATIONS_FAILURE':
      return {
        errorMessage: action.errorMessage,
        isFetching: false,
        notifications: [],
      };
    case 'CLEAR_NOTIFICATIONS_REQUEST':
      return {
        errorMessage: null,
        isFetching: false,
        notifications: [],
      };
    case 'CLEAR_NOTIFICATIONS_FAILURE':
      return {
        ...state,
        errorMessage: action.errorMessage,
        isFetching: false,
      };
    default:
      return state;
  }
};

export const getNotifications = (state: State) => {
  return state.notifications;
};
