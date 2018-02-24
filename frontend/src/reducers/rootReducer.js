import {combineReducers} from 'redux';
import {auth} from './auth';
import {rules} from './rules';
import {notifications} from './notifications';

export const rootReducer = combineReducers({
  auth,
  notifications,
  rules,
});
