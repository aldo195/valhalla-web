import * as api from '../api'
import * as actionTypes from '../constants/actionTypes'
import * as _ from "lodash";
import {logoutAndRedirect} from "./auth";

export const loadOrganizationsRequest = () => ({
  type: actionTypes.LOAD_ORGANIZATIONS_REQUEST
});

export const loadOrganizationsSuccess = (response) => ({
  type: actionTypes.LOAD_ORGANIZATIONS_SUCCESS,
  response
});

export const loadOrganizationsFailure = (errorMessage) => ({
  type: actionTypes.LOAD_ORGANIZATIONS_FAILURE,
  errorMessage
});

const shouldLoadOrganizations = (state) => {
  const organizations = state.organizations;

  if (organizations.isFetching) {
    return false;
  }

  return _.isEmpty(organizations.organizations);
};

export const loadOrganizationsIfNeeded = (token, history) => (dispatch, getState) => {
  const state = getState();
  if (shouldLoadOrganizations(state)) {
    dispatch(loadOrganizationsRequest());

    api.loadOrganizations(token).then(
      response =>
        dispatch(loadOrganizationsSuccess(response)),
      error => {
        dispatch(loadOrganizationsFailure(error.message));
        if (error.status === 401) {
          dispatch(logoutAndRedirect(history));
        }
      }
    );
  }
};
