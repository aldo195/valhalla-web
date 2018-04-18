import * as _ from 'lodash';
import {Dispatch} from 'redux';
import * as api from '../api';
import {Rule, State} from '../reducers/types';
import {createAction, GetState} from './action-helpers';
import {ActionsUnion} from './types';

export const LOAD_RULES_REQUEST = 'LOAD_RULES_REQUEST';
export const LOAD_RULES_SUCCESS = 'LOAD_RULES_SUCCESS';
export const LOAD_RULES_FAILURE = 'LOAD_RULES_FAILURE';

export interface LoadRulesSuccessPayload {
  rules: ReadonlyArray<Rule>;
}

export const LoadRulesActions = {
  loadRulesRequest: () => createAction(LOAD_RULES_REQUEST),
  loadRulesSuccess: (response: LoadRulesSuccessPayload) => createAction(LOAD_RULES_SUCCESS, response),
  loadRulesFailure: (errorMessage: string) => createAction(LOAD_RULES_FAILURE, errorMessage),
};

export type LoadRulesActions = ActionsUnion<typeof LoadRulesActions>;

const shouldLoadRules = (state: State) => {
  const rules = state.rules;

  if (rules.isFetching) {
    return false;
  }

  return _.isEmpty(rules.rules);
};

export const loadRulesIfNeeded = (token: string) => async (dispatch: Dispatch<State>, getState: GetState) => {
  const state = getState();
  if (shouldLoadRules(state)) {
    dispatch(LoadRulesActions.loadRulesRequest());

    try {
      const response = await api.loadRules(token);
      dispatch(LoadRulesActions.loadRulesSuccess(response));
    } catch (error) {
      dispatch(LoadRulesActions.loadRulesFailure(error.message));
    }
  }
};
