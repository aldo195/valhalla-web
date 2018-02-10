import * as actionTypes from '../constants/actionTypes';
import * as _ from 'lodash';

export const rules = (
  state = {
    rules: {},
    isFetching: false,
    errorMessage: null,
  },
  action,
) => {
  switch (action.type) {
    case actionTypes.LOAD_RULES_REQUEST:
      return {
        ...state,
        isFetching: true,
        errorMessage: null,
      };
    case actionTypes.LOAD_RULES_SUCCESS:
      return {
        rules: _.mapValues(action.response.rules, rule => rule.rule_id),
        isFetching: false,
        errorMessage: null,
      };
    case actionTypes.LOAD_RULES_FAILURE:
      return {
        rules: {},
        isFetching: false,
        errorMessage: action.errorMessage,
      };
    default:
      return state;
  }
};

export const getRules = state => {
  return state.rules;
};
