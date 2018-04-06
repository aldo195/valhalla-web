import * as _ from 'lodash';
import {Reducer} from 'redux';
import {Rule, RuleByIdState, State} from './types';

export const initialState: RuleByIdState = {};

export const ruleById: Reducer<RuleByIdState> = (state: RuleByIdState = initialState, action) => {
  switch (action.type) {
    case 'LOAD_RULES_SUCCESS':
      const nextState = {...state};
      _.forEach(_.values(action.response.rules), (r: Rule) => {
        nextState[r.rule_id] = r;
      });
      return nextState;
    default:
      return state;
  }
};

export const getRule = (state: State, ruleId: number) => {
  return state.ruleById[ruleId];
};
