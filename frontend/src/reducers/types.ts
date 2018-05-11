import * as React from 'react';
import {RouteComponentProps} from 'react-router';

export interface AuthDetails {
  readonly isAuthenticated: boolean;
  readonly token: string | null;
  readonly email: string | null;
  readonly role: string | null;
  readonly organizationId: number | null;
  readonly avatar: string | undefined;
}

export interface AuthState extends AuthDetails {
  readonly isFetching: boolean;
  readonly errorMessage: string | null;
}

export interface AuthStatus {
  readonly isFetching: boolean;
  readonly isAuthenticated: boolean;
  readonly errorMessage: string | null;
}

export interface Notification {
  readonly datetime: string;
  readonly id: number;
  readonly status: string;
}

export interface NotificationsState {
  readonly errorMessage: string | null;
  readonly isFetching: boolean;
  readonly notifications: ReadonlyArray<Notification>;
}

export interface Organization {
  readonly title: string;
}

export interface OrganizationState {
  readonly errorMessage: string | null;
  readonly isFetching: boolean;
  readonly details: Organization | null;
}

export interface Rule {
  readonly category: string;
  readonly creation_time: string;
  readonly csf: string;
  readonly description: string;
  readonly first_test_time: string;
  readonly last_test_time: string;
  readonly organization_id: number;
  readonly owner_id: number;
  readonly reason: string;
  readonly rule_id: number;
  readonly rule_status_id: number;
  readonly status: string;
  readonly system: string;
  readonly test_logic: string;
  readonly tester_id: number;
  readonly title: string;
}

export interface RuleByIdState {
  readonly [key: number]: Rule;
}

export interface RulesState {
  readonly errorMessage: string | null;
  readonly isFetching: boolean;
  readonly rules: ReadonlyArray<number>;
}

export interface State {
  readonly auth: AuthState;
  readonly notifications: NotificationsState;
  readonly organization: OrganizationState;
  readonly ruleById: RuleByIdState;
  readonly rules: RulesState;
}

export interface RouterData {
  readonly [key: string]: {
    readonly name: string;
    readonly roles: ReadonlyArray<string>;
    component?: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
  };
}

export interface MenuItem {
  readonly name: string;
  readonly path: string;
  readonly target?: string;
  readonly icon?: string;
  readonly hideInMenu?: boolean;
  readonly key?: string;
  readonly roles?: string[];
  readonly children?: ReadonlyArray<MenuItem>;
}

export type MenuData = ReadonlyArray<MenuItem>;
