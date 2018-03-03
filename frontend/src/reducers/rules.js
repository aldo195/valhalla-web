import * as actionTypes from '../constants/actionTypes';
import * as _ from 'lodash';
import moment from 'moment';

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
        rules: _.map(action.response.rules, rule => rule.rule_id),
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

export const getRuleStats = state => {
  const rules = _.values(state.ruleById);
  const lastWeekDate = moment().subtract(7, 'days');
  const total = rules.length || 0;

  let passing = 0;
  let lastWeek = 0;
  let categories = {};

  _.forEach(_.values(rules), r => {
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
    if (moment(r.first_test_time).isSameOrAfter(lastWeekDate)) {
      lastWeek++;
    }
  });

  // Flatten categories.
  categories = _.values(categories);

  return {
    categories,
    total,
    lastWeek,
    validation: passing / total || 0,
  };
};
