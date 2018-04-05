import * as _ from 'lodash';
import {Reducer} from 'redux';
import * as actionTypes from '../constants/actionTypes';
import {RuleByIdState, State} from './types';

export const ruleById: Reducer<RuleByIdState> = (state: RuleByIdState, action) => {
  switch (action.type) {
    case actionTypes.LOAD_RULES_SUCCESS:
      const nextState = {...state};
      _.forEach(_.values(action.response.rules), r => {
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
