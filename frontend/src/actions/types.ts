import {Action} from 'redux';
import {Organization, Rule, State} from '../reducers/types';

export type GetState = () => State;

export interface LoginRequestAction extends Action {
  readonly type: 'LOGIN_REQUEST';
}

export interface LoginSuccessAction extends Action {
  readonly payload: {
    readonly token: string;
  };
  readonly type: 'LOGIN_SUCCESS';
}

export interface LoginFailureAction extends Action {
  readonly payload: {
    readonly errorMessage: string;
  };
  readonly type: 'LOGIN_FAILURE';
}

export type LoginActions = LoginRequestAction | LoginSuccessAction | LoginFailureAction;

export interface LogoutAction extends Action {
  readonly type: 'LOGOUT';
}

export interface RegisterRequestAction extends Action {
  type: 'REGISTER_REQUEST';
}

export interface RegisterSuccessAction extends Action {
  readonly payload: {
    readonly token: string;
  };
  type: 'REGISTER_SUCCESS';
}

export interface RegisterFailureAction extends Action {
  readonly payload: {
    readonly errorMessage: string;
  };
  type: 'REGISTER_FAILURE';
}

export type RegisterActions = RegisterRequestAction | RegisterSuccessAction | RegisterFailureAction;

export interface LoadRulesRequestAction extends Action {
  type: 'LOAD_RULES_REQUEST';
}

export interface LoadRulesSuccessPayload {
  rules: ReadonlyArray<Rule>;
}

export interface LoadRulesSuccessAction extends Action {
  readonly payload: {
    readonly response: LoadRulesSuccessPayload;
  };
  type: 'LOAD_RULES_SUCCESS';
}

export interface LoadRulesFailureAction extends Action {
  readonly payload: {
    readonly errorMessage: string;
  };
  type: 'LOAD_RULES_FAILURE';
}

export type RulesActions = LoadRulesRequestAction | LoadRulesSuccessAction | LoadRulesFailureAction;

export interface LoadNotificationsRequestAction extends Action {
  type: 'LOAD_NOTIFICATIONS_REQUEST';
}

export interface LoadNotificationsSuccessPayload {
  rules: ReadonlyArray<Notification>;
}

export interface LoadNotificationsSuccessAction extends Action {
  readonly payload: {
    readonly response: LoadNotificationsSuccessPayload;
  };
  type: 'LOAD_NOTIFICATIONS_SUCCESS';
}

export interface LoadNotificationsFailureAction extends Action {
  readonly payload: {
    readonly errorMessage: string;
  };
  type: 'LOAD_NOTIFICATIONS_FAILURE';
}

export type LoadNotificationsActions =
  | LoadNotificationsRequestAction
  | LoadNotificationsSuccessAction
  | LoadNotificationsFailureAction;

export interface ClearNotificationsRequestAction extends Action {
  type: 'CLEAR_NOTIFICATIONS_REQUEST';
}

export interface ClearNotificationsSuccessAction extends Action {
  type: 'CLEAR_NOTIFICATIONS_SUCCESS';
}

export interface ClearNotificationsFailureAction extends Action {
  readonly payload: {
    readonly errorMessage: string;
  };
  type: 'CLEAR_NOTIFICATIONS_FAILURE';
}

export type ClearNotificationsActions =
  | ClearNotificationsRequestAction
  | ClearNotificationsSuccessAction
  | ClearNotificationsFailureAction;

export interface GetOrganizationRequestAction extends Action {
  type: 'GET_ORGANIZATION_REQUEST';
}

export interface GetOrganizationSuccessAction extends Action {
  readonly payload: {
    readonly response: Organization;
  };
  type: 'GET_ORGANIZATION_SUCCESS';
}

export interface GetOrganizationFailureAction extends Action {
  readonly payload: {
    readonly errorMessage: string;
  };
  type: 'GET_ORGANIZATION_FAILURE';
}

export type GetOrganizationActions =
  | GetOrganizationRequestAction
  | GetOrganizationSuccessAction
  | GetOrganizationFailureAction;
