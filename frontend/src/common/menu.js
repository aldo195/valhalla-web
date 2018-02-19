import {isUrl} from '../utils/routing';
import * as roles from '../constants/roles';

const menuData = [
  {
    name: 'Security Policy',
    icon: 'table',
    path: 'dashboard/analysis',
    roles: [roles.ADMIN, roles.USER],
  },
  {
    name: 'Policy Builder',
    icon: 'form',
    path: 'dashboard/monitor',
    roles: [roles.ADMIN],
  },
  {
    name: 'Approved Items',
    icon: 'check-square-o',
    path: 'list/basic-list',
    roles: [roles.ADMIN, roles.USER],
  },
  {
    name: 'User',
    icon: 'user',
    path: 'user',
    children: [
      {
        name: 'Login',
        path: 'login',
      },
      {
        name: 'Register',
        path: 'register',
      },
      {
        name: 'Register Result',
        path: 'register-result',
      },
    ],
  },
];

function formatter(data, parentPath = '', parentRoles) {
  return data.map(item => {
    // Generate roles and absolute paths recursively.
    let {path} = item;
    if (!isUrl(path)) {
      path = parentPath + item.path;
    }
    const result = {
      ...item,
      path,
      roles: item.roles || parentRoles,
    };
    if (item.children) {
      result.children = formatter(item.children, `${parentPath}${item.path}/`, item.roles);
    }
    return result;
  });
}

export const getMenuData = () => formatter(menuData);
