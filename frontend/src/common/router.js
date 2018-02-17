import {createElement} from 'react';
import pathToRegexp from 'path-to-regexp';
import {getMenuData} from './menu';

let routerDataCache;

const dynamicWrapper = component => {
  return {
    // Add routerData prop.
    component: () => {
      if (!routerDataCache) {
        routerDataCache = getRouterData();
      }
      return component().then(raw => {
        const Component = raw.default || raw;
        return props =>
          createElement(Component, {
            ...props,
            routerData: routerDataCache,
          });
      });
    },
  };
};

function getFlatMenuData(menus) {
  let keys = {};
  menus.forEach(item => {
    if (item.children) {
      keys[item.path] = {...item};
      keys = {...keys, ...getFlatMenuData(item.children)};
    } else {
      keys[item.path] = {...item};
    }
  });
  return keys;
}

export const getRouterData = () => {
  const routerConfig = {
    '/': {
      component: dynamicWrapper(() => import('../layouts/BasicLayout')),
    },
    '/dashboard/analysis': {
      component: dynamicWrapper(() => import('../routes/Dashboard/Analysis')),
    },
    '/exception/403': {
      component: dynamicWrapper(() => import('../routes/Exception/403')),
    },
    '/exception/404': {
      component: dynamicWrapper(() => import('../routes/Exception/404')),
    },
    '/exception/500': {
      component: dynamicWrapper(() => import('../routes/Exception/500')),
    },
    '/exception/trigger': {
      component: dynamicWrapper(() => import('../routes/Exception/triggerException')),
    },
    '/user': {
      component: dynamicWrapper(() => import('../layouts/UserLayout')),
    },
    '/user/login': {
      component: dynamicWrapper(() => import('../routes/User/Login')),
    },
    '/user/register': {
      component: dynamicWrapper(() => import('../routes/User/Register')),
    },
    '/user/register-result': {
      component: dynamicWrapper(() => import('../routes/User/RegisterResult')),
    },
  };
  // Get name from ./menu.js or just set it in the router data.
  const menuData = getFlatMenuData(getMenuData());

  // Route configuration data.
  // eg. {name,authority ...routerConfig}
  const routerData = {};
  // The route matches the menu.
  Object.keys(routerConfig).forEach(path => {
    // Regular match item name.
    // eg. router /user/:id === /user/chen
    const pathRegexp = pathToRegexp(path);
    const menuKey = Object.keys(menuData).find(key => pathRegexp.test(`/${key}`));
    let menuItem = {};
    // If menuKey is not empty.
    if (menuKey) {
      menuItem = menuData[menuKey];
    }
    let router = routerConfig[path];
    router = {
      ...router,
      name: router.name || menuItem.name,
      authority: router.authority || menuItem.authority,
    };
    routerData[path] = router;
  });
  return routerData;
};
