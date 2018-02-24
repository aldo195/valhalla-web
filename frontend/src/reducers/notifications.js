import * as actionTypes from '../constants/actionTypes';

export const notifications = (
  state = {
    notifications: [],
    isFetching: false,
    errorMessage: null,
  },
  action,
) => {
  switch (action.type) {
    case actionTypes.LOAD_NOTIFICATIONS_REQUEST:
      return {
        ...state,
        isFetching: true,
        errorMessage: null,
      };
    case actionTypes.LOAD_NOTIFICATIONS_SUCCESS:
      return {
        notifications: action.response.notifications,
        isFetching: false,
        errorMessage: null,
      };
    case actionTypes.LOAD_NOTIFICATIONS_FAILURE:
      return {
        notifications: [],
        isFetching: false,
        errorMessage: action.errorMessage,
      };
    case actionTypes.CLEAR_NOTIFICATIONS_REQUEST:
      return {
        notifications: [],
        isFetching: false,
        errorMessage: null,
      };
    case actionTypes.CLEAR_NOTIFICATIONS_FAILURE:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.errorMessage,
      };
    default:
      return state;
  }
};

export const getNotifications = state => {
  return state.notifications;
};
