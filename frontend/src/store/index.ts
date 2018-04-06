import {initialState as authInitialState} from '../reducers/auth';
import {initialState as notificationsInitialState} from '../reducers/notifications';
import {initialState as organizationInitialState} from '../reducers/organization';
import {initialState as ruleByIdInitialState} from '../reducers/ruleById';
import {initialState as rulesInitialState} from '../reducers/rules';
import {configureStore as devConfigureStore} from './configureStore.dev';
import {configureStore as prodConfigureStore} from './configureStore.prod';

const initialState = {
  auth: authInitialState,
  notifications: notificationsInitialState,
  organization: organizationInitialState,
  ruleById: ruleByIdInitialState,
  rules: rulesInitialState,
};

export const store =
  process.env.NODE_ENV !== 'production' ? devConfigureStore(initialState) : prodConfigureStore(initialState);
