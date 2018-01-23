import * as actionTypes from "../constants/actionTypes";
import * as _ from "lodash";

export const organizations = (state = {
  organizations: {},
  isFetching: false,
  errorMessage: null
}, action) => {
  switch (action.type) {
    case actionTypes.LOAD_ORGANIZATIONS_REQUEST:
      return {
        ...state,
        isFetching: true,
        errorMessage: null
      };
    case actionTypes.LOAD_ORGANIZATIONS_SUCCESS:
      return {
        organizations: _.mapValues(action.response.organizations, (organization) => organization.organization_id),
        isFetching: false,
        errorMessage: null
      };
    case actionTypes.LOAD_ORGANIZATIONS_FAILURE:
      return {
        organizations: {},
        isFetching: false,
        errorMessage: action.errorMessage
      };
    default:
      return state;
  }
};

export const getOrganizations = (state) => {
  return state.organizations;
};
