import * as _ from 'lodash';
import {ActionCreator, Dispatch} from 'redux';
import * as api from '../api';
import {Organization, State} from '../reducers/types';
import * as actionTypes from './types';

export const getOrganizationRequest: ActionCreator<actionTypes.GetOrganizationRequestAction> = () => ({
  type: 'GET_ORGANIZATION_REQUEST',
});

export const getOrganizationSuccess: ActionCreator<actionTypes.GetOrganizationSuccessAction> = (
  response: Organization,
) => ({
  payload: {
    response,
  },
  type: 'GET_ORGANIZATION_SUCCESS',
});

export const getOrganizationFailure: ActionCreator<actionTypes.GetOrganizationFailureAction> = errorMessage => ({
  payload: {
    errorMessage,
  },
  type: 'GET_ORGANIZATION_FAILURE',
});

const shouldGetOrganization = (state: State) => {
  const organization = state.organization;

  if (organization.isFetching) {
    return false;
  }

  return _.isEmpty(organization.details);
};

export const getOrganizationIfNeeded = (organizationId: number, token: string) => async (
  dispatch: Dispatch<State>,
  getState: actionTypes.GetState,
) => {
  const state = getState();
  if (shouldGetOrganization(state)) {
    dispatch(getOrganizationRequest());

    try {
      const response = await api.getOrganization(organizationId, token);
      dispatch(getOrganizationSuccess(response));
    } catch (error) {
      dispatch(getOrganizationFailure(error.message));
    }
  }
};
