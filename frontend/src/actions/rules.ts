import * as _ from 'lodash';
import {ActionCreator, Dispatch} from 'redux';
import * as api from '../api';
import {State} from '../reducers/types';
import * as actionTypes from './types';

export const loadRulesRequest: ActionCreator<actionTypes.LoadRulesRequestAction> = () => ({
  type: 'LOAD_RULES_REQUEST',
});

export const loadRulesSuccess: ActionCreator<actionTypes.LoadRulesSuccessAction> = (
  response: actionTypes.LoadRulesSuccessPayload,
) => ({
  payload: {
    response,
  },
  type: 'LOAD_RULES_SUCCESS',
});

export const loadRulesFailure: ActionCreator<actionTypes.LoadRulesFailureAction> = (errorMessage: string) => ({
  payload: {
    errorMessage,
  },
  type: 'LOAD_RULES_FAILURE',
});

const shouldLoadRules = (state: State) => {
  const rules = state.rules;

  if (rules.isFetching) {
    return false;
  }

  return _.isEmpty(rules.rules);
};

export const loadRulesIfNeeded = (token: string) => async (
  dispatch: Dispatch<State>,
  getState: actionTypes.GetState,
) => {
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
