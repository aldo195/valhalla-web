// @flow
export type AuthDetails = {
  +isAuthenticated: boolean,
  +token: string,
  +email: string,
  +role: string,
  +organizationId: number,
  +avatar?: string,
};

export type AuthStatus = {
  +isFetching: boolean,
  +isAuthenticated: boolean,
  +errorMessage: string,
};

export type Notifications = {
  +errorMessage?: string,
  +isFetching: boolean,
  +notifications: Array<{
    +datetime: string,
    +id: number,
    +status: string,
    +extra?: string,
  }>,
};

export type Organization = {
  +errorMessage?: string,
  +isFetching: boolean,
  +details: {
    +title: string,
  },
};

export type RuleStats = {
  +errorMessage?: string,
  +isFetching: boolean,
  +categories: Array<{
    +name: string,
  }>,
  +total: number,
  +lastWeek: boolean,
  +validation: number,
};

export type RouterData = {
  +[string]: {
    +name: string,
    +roles: Array<string>,
  },
};

export type MenuItem = {
  +name: string,
  +path: string,
  +target?: string,
  +icon?: string,
  +hideInMenu?: boolean,
  +roles: Array<string>,
  +children: Array<MenuItem>,
};
export type MenuData = Array<MenuItem>;

export type State = {
  +auth: {
    ...AuthDetails,
    +isFetching: boolean,
    +errorMessage?: string,
  },
  +notifications: Notifications,
};
type Action = {
  +type: string,
};
type GetState = () => State;
export type ThunkAction = (dispatch: (action: Action | ThunkAction) => any, getState: GetState) => any;
