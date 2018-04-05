import {Action} from 'redux';

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
