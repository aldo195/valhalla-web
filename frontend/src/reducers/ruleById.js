import * as actionTypes from '../constants/actionTypes';
import * as _ from 'lodash';

export const ruleById = (state = {}, action) => {
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

export const getRule = (state, ruleId) => {
  return state.ruleById[ruleId];
};
