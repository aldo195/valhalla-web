import React from 'react';
import * as routes from './constants/routes';
import * as roles from './constants/roles';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {AuthorizedRoute} from './components/AuthorizedRoute';
import {UserLayout} from './layouts/UserLayout';

let RouterConfig = () => (
  <BrowserRouter basename={routes.HOME}>
    <Switch>
      <Route path={routes.USER} render={props => <UserLayout {...props} />} />
      <AuthorizedRoute
        path={routes.DEFAULT}
        render={props => <BasicLayout {...props} />}
        roles={[roles.USER, roles.ADMIN]}
        redirectPath={routes.LOGIN}
      />
    </Switch>
  </BrowserRouter>
);

export {RouterConfig};
