import {combineReducers, Reducer} from 'redux';
import {auth} from './auth';
import {notifications} from './notifications';
import {organization} from './organization';
import {ruleById} from './ruleById';
import {rules} from './rules';
import {State} from './types';

export const rootReducer: Reducer<State> = combineReducers<State>({
  auth,
  notifications,
  organization,
  ruleById,
  rules,
});
