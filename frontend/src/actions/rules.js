import * as api from '../api';
import * as actionTypes from '../constants/actionTypes';
import * as _ from 'lodash';

export const loadRulesRequest = () => ({
  type: actionTypes.LOAD_RULES_REQUEST,
});

export const loadRulesSuccess = response => ({
  type: actionTypes.LOAD_RULES_SUCCESS,
  response,
});

export const loadRulesFailure = errorMessage => ({
  type: actionTypes.LOAD_RULES_FAILURE,
  errorMessage,
});

const shouldLoadRules = state => {
  const rules = state.rules;

  if (rules.isFetching) {
    return false;
  }

  return _.isEmpty(rules.rules);
};

export const loadRulesIfNeeded = token => async (dispatch, getState) => {
  const state = getState();
  if (shouldLoadRules(state)) {
    dispatch(loadRulesRequest());

    try {
      const response = await api.loadRules(token);
      dispatch(loadRulesSuccess(response));
    } catch (error) {
      dispatch(loadRulesFailure(error.message));
    }
  }
};
