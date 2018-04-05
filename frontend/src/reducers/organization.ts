import {Reducer} from 'redux';
import * as actionTypes from '../constants/actionTypes';
import {OrganizationState, State} from './types';

const initialState: OrganizationState = {
  details: null,
  errorMessage: null,
  isFetching: false,
};

export const organization: Reducer<OrganizationState> = (state: OrganizationState = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_ORGANIZATION_REQUEST:
      return {
        ...state,
        errorMessage: null,
        isFetching: true,
      };
    case actionTypes.GET_ORGANIZATION_SUCCESS:
      return {
        details: action.response,
        errorMessage: null,
        isFetching: false,
      };
    case actionTypes.GET_ORGANIZATION_FAILURE:
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
