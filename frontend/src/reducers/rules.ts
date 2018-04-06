import * as _ from 'lodash';
import {DateTime} from 'luxon';
import {Reducer} from 'redux';
import {Rule, RulesState, State} from './types';

export const initialState: RulesState = {
  errorMessage: null,
  isFetching: false,
  rules: [],
};

export const rules: Reducer<RulesState> = (state: RulesState = initialState, action) => {
  switch (action.type) {
    case 'LOAD_RULES_REQUEST':
      return {
        ...state,
        errorMessage: null,
        isFetching: true,
      };
    case 'LOAD_RULES_SUCCESS':
      return {
        errorMessage: null,
        isFetching: false,
        rules: _.map(action.response.rules, (rule: Rule) => rule.rule_id),
      };
    case 'LOAD_RULES_FAILURE':
      return {
        errorMessage: action.errorMessage,
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
  const rules = _.values(state.ruleById);
  const lastWeekDate = DateTime.utc().minus({days: 7});
  const total = rules.length || 0;

  let passing = 0;
  let lastWeek = 0;
  let categories = {};

  _.forEach(_.values(rules), (r: Rule) => {
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
