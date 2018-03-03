import * as actionTypes from '../constants/actionTypes';

export const organization = (
  state = {
    details: {},
    isFetching: false,
    errorMessage: null,
  },
  action,
) => {
  switch (action.type) {
    case actionTypes.GET_ORGANIZATION_REQUEST:
      return {
        ...state,
        isFetching: true,
        errorMessage: null,
      };
    case actionTypes.GET_ORGANIZATION_SUCCESS:
      return {
        details: action.response,
        isFetching: false,
        errorMessage: null,
      };
    case actionTypes.GET_ORGANIZATION_FAILURE:
      return {
        details: {},
        isFetching: false,
        errorMessage: action.errorMessage,
      };
    default:
      return state;
  }
};

export const getOrganization = state => {
  return state.organization;
};
