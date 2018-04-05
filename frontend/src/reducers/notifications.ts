import {Reducer} from 'redux';
import * as actionTypes from '../constants/actionTypes';
import {NotificationsState, State} from './types';

const initialState: NotificationsState = {
  errorMessage: null,
  isFetching: false,
  notifications: [],
};

export const notifications: Reducer<NotificationsState> = (state: NotificationsState = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOAD_NOTIFICATIONS_REQUEST:
      return {
        ...state,
        errorMessage: null,
        isFetching: true,
      };
    case actionTypes.LOAD_NOTIFICATIONS_SUCCESS:
      return {
        errorMessage: null,
        isFetching: false,
        notifications: action.response.notifications,
      };
    case actionTypes.LOAD_NOTIFICATIONS_FAILURE:
      return {
        errorMessage: action.errorMessage,
        isFetching: false,
        notifications: [],
      };
    case actionTypes.CLEAR_NOTIFICATIONS_REQUEST:
      return {
        errorMessage: null,
        isFetching: false,
        notifications: [],
      };
    case actionTypes.CLEAR_NOTIFICATIONS_FAILURE:
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
