import React from 'react';
import * as routes from './constants/routes';
import * as roles from './constants/roles';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {AuthorizedRoute} from './components/AuthorizedRoute';
import {getRouterData} from './common/router';

let ValhallaApp = () => {
  const routerData = getRouterData();
  const UserLayout = routerData[routes.USER].component;
  const BasicLayout = routerData[routes.DEFAULT].component;

  return (
    <BrowserRouter basename={routes.DEFAULT}>
      <Switch>
        <Route path={routes.USER} component={UserLayout} />} />
        <AuthorizedRoute
          path={routes.DEFAULT}
          render={props => <BasicLayout {...props} />}
          roles={[roles.USER, roles.ADMIN]}
          redirectPath={routes.LOGIN}
        />
      </Switch>
    </BrowserRouter>
  );
};

export {ValhallaApp};
