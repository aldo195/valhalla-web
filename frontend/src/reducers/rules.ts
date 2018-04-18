import * as _ from 'lodash';
import {DateTime} from 'luxon';
import {Reducer} from 'redux';
import * as FromActions from '../actions/rules';
import {Rule, RulesState, State} from './types';

export const initialState: RulesState = {
  errorMessage: null,
  isFetching: false,
  rules: [],
};

export const rules: Reducer<RulesState> = (state = initialState, action: FromActions.LoadRulesActions) => {
  switch (action.type) {
    case FromActions.LOAD_RULES_REQUEST:
      return {
        ...state,
        errorMessage: null,
        isFetching: true,
      };
    case FromActions.LOAD_RULES_SUCCESS:
      return {
        errorMessage: null,
        isFetching: false,
        rules: _.map(action.payload.rules, (rule: Rule) => rule.rule_id),
      };
    case FromActions.LOAD_RULES_FAILURE:
      return {
        errorMessage: action.payload,
        isFetching: false,
        rules: [],
      };
    default:
      return state;
  }
};

export const getRules = (state: State) => {
  return state.rules;
};

export const getFullRules = (state: State) => {
  return _.values(_.pick(state.ruleById, state.rules.rules as _.Many<_.PropertyName>));
};

export const getRuleStats = (state: State) => {
  const allRules = _.values(state.ruleById);
  const lastWeekDate = DateTime.utc().minus({days: 7});
  const total = allRules.length || 0;

  let passing = 0;
  let lastWeek = 0;
  let categories = {};

  _.forEach(_.values(allRules), (r: Rule) => {
    // Extract stats for each rules category.
    if (!categories[r.category]) {
      categories[r.category] = {name: r.category};
    }
    if (!categories[r.category][r.status]) {
      categories[r.category][r.status] = 1;
    } else {
      categories[r.category][r.status]++;
    }

    // Count passing rules.
    if (r.status === 'passing') {
      passing++;
    }

    // Count rules created in the last week.
    if (DateTime.fromISO(r.first_test_time) >= lastWeekDate) {
      lastWeek++;
    }
  });

  // Flatten categories.
  categories = _.values(categories);

  return {
    categories,
    lastWeek,
    total,
    validation: passing / total || 0,
  };
};
