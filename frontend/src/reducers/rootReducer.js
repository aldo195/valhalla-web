import {combineReducers} from 'redux';
import {auth} from './auth';
import {rules} from './rules';
import {notifications} from './notifications';
import {organization} from './organization';
import {ruleById} from './ruleById';

export const rootReducer = combineReducers({
  auth,
  notifications,
  organization,
  rules,
  ruleById,
});
