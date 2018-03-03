import * as api from '../api';
import * as actionTypes from '../constants/actionTypes';
import * as _ from 'lodash';

export const getOrganizationRequest = () => ({
  type: actionTypes.GET_ORGANIZATION_REQUEST,
});

export const getOrganizationSuccess = response => ({
  type: actionTypes.GET_ORGANIZATION_SUCCESS,
  response,
});

export const getOrganizationFailure = errorMessage => ({
  type: actionTypes.GET_ORGANIZATION_FAILURE,
  errorMessage,
});

const shouldGetOrganization = state => {
  const organization = state.organization;

  if (organization.isFetching) {
    return false;
  }

  return _.isEmpty(organization.details);
};

export const getOrganizationIfNeeded = (organizationId, token) => (dispatch, getState) => {
  const state = getState();
  if (shouldGetOrganization(state)) {
    dispatch(getOrganizationRequest());

    api.getOrganization(organizationId, token).then(
      response => dispatch(getOrganizationSuccess(response)),
      error => {
        dispatch(getOrganizationFailure(error.message));
      },
    );
  }
};
