import {Reducer} from 'redux';
import {OrganizationState, State} from './types';

export const initialState: OrganizationState = {
  details: null,
  errorMessage: null,
  isFetching: false,
};

export const organization: Reducer<OrganizationState> = (state: OrganizationState = initialState, action) => {
  switch (action.type) {
    case 'GET_ORGANIZATION_REQUEST':
      return {
        ...state,
        errorMessage: null,
        isFetching: true,
      };
    case 'GET_ORGANIZATION_SUCCESS':
      return {
        details: action.response,
        errorMessage: null,
        isFetching: false,
      };
    case 'GET_ORGANIZATION_FAILURE':
      return {
        details: null,
        errorMessage: action.errorMessage,
        isFetching: false,
      };
    default:
      return state;
  }
};

export const getOrganization = (state: State) => {
  return state.organization;
};
