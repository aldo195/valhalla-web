import {Icon, Layout, Menu} from 'antd';
import {History} from 'history';
import * as _ from 'lodash';
import pathToRegexp from 'path-to-regexp';
import * as React from 'react';
import {Link} from 'react-router-dom';
import * as stateTypes from '../../reducers/types';
import './SiderMenu.css';

const {Sider} = Layout;
const {SubMenu} = Menu;

// Allow menu.ts config icon as string or ReactNode
//   icon: 'setting',
//   icon: 'http://demo.com/icon.png',
//   icon: <Icon type="setting" />,
const getIcon = (icon: string | React.ReactNode) => {
  if (typeof icon === 'string' && icon.indexOf('http') === 0) {
    return <img src={icon} alt="icon" className={'icon'} />;
  }
  if (typeof icon === 'string') {
    return <Icon type={icon} />;
  }
  return icon;
};

interface OwnProps {
  isMobile: boolean;
  logo: string;
  menuData: stateTypes.MenuData;
  collapsed: boolean;
  onCollapse: (isCollapsed: boolean) => void;
  history: History;
  auth: stateTypes.AuthDetails;
}

interface StateProps {
  auth: stateTypes.AuthDetails;
}

type SiderMenuProps = OwnProps & StateProps;

type State = {
  openKeys: string[];
};

class SiderMenu extends React.PureComponent<SiderMenuProps, State> {
  constructor(props: SiderMenuProps) {
    super(props);
    this.state = {
      openKeys: this.getDefaultCollapsedSubMenus(props.history.location.pathname),
    };
  }
  componentWillReceiveProps(nextProps: SiderMenuProps) {
    const nextPathname = nextProps.history.location.pathname;
    if (nextPathname !== this.props.history.location.pathname) {
      this.setState({
        openKeys: this.getDefaultCollapsedSubMenus(nextPathname),
      });
    }
  }
  /**
   * Convert pathname to openKeys
   * /list/search/articles = > ['list','/list/search']
   */
  getDefaultCollapsedSubMenus(pathname: string) {
    // eg. /list/search/articles = > ['','list','search','articles']
    let snippets = pathname.split('/');
    // Delete the end
    // eg.  delete 'articles'
    snippets.pop();
    // Delete the head
    // eg. delete ''
    snippets.shift();
    // eg. After the operation is completed, the array should be ['list','search']
    // eg. Forward the array as ['list','list/search']
    snippets = snippets.map((item, index) => {
      // If the array length > 1
      if (index > 0) {
        // eg. search => ['list','search'].join('/')
        return snippets.slice(0, index + 1).join('/');
      }
      // index 0 to not do anything
      return item;
    });
    snippets = snippets.map(item => {
      return this.getSelectedMenuKeys(`/${item}`)[0];
    });
    // eg. ['list','list/search']
    return snippets;
  }
  /**
   * Recursively flatten the data
   * [{path:string},{path:string}] => {path,path2}
   * @param  menus
   */
  getFlatMenuKeys(menus: stateTypes.MenuData) {
    let keys: string[] = [];
    if (menus) {
      menus.forEach(item => {
        if (item.children) {
          keys.push(item.path);
          keys = keys.concat(this.getFlatMenuKeys(item.children));
        } else {
          keys.push(item.path);
        }
      });
    }
    return keys;
  }
  /**
   * Get selected child nodes
   * /user/chen => /user/:id
   */
  getSelectedMenuKeys = (path: string) => {
    const flatMenuKeys = this.getFlatMenuKeys(this.props.menuData);
    return flatMenuKeys.filter(item => {
      return pathToRegexp(`/${item}`).test(path);
    });
  };
  /**
   * Judge whether it is http link.return a or Link
   */
  getMenuItemPath = (item: stateTypes.MenuItem) => {
    const itemPath = this.conversionPath(item.path);
    const icon = getIcon(item.icon);
    const {target, name} = item;
    // Is it a http link
    if (/^https?:\/\//.test(itemPath)) {
      return (
        <a href={itemPath} target={target}>
          {icon}
          <span>{name}</span>
        </a>
      );
    }
    return (
      <Link
        to={itemPath}
        target={target}
        replace={itemPath === this.props.history.location.pathname}
        onClick={
          this.props.isMobile
            ? () => {
                this.props.onCollapse(true);
              }
            : undefined
        }
      >
        {icon}
        <span>{name}</span>
      </Link>
    );
  };
  /**
   * get SubMenu or Item
   */
  getSubMenuOrItem = (item: stateTypes.MenuItem): React.ReactNode => {
    if (item.children && item.children.some(child => !_.isNil(child.name))) {
      return (
        <SubMenu
          title={
            item.icon ? (
              <span>
                {getIcon(item.icon)}
                <span>{item.name}</span>
              </span>
            ) : (
              item.name
            )
          }
          key={item.path}
        >
          {this.getNavMenuItems(item.children)}
        </SubMenu>
      );
    } else {
      return <Menu.Item key={item.path}>{this.getMenuItemPath(item)}</Menu.Item>;
    }
  };

  getNavMenuItems = (menusData: stateTypes.MenuData) => {
    if (!menusData) {
      return [];
    }
    return menusData
      .filter(item => item.name && !item.hideInMenu)
      .map(item => {
        const ItemDom = this.getSubMenuOrItem(item);
        return this.checkPermissionItem(item.roles, ItemDom);
      })
      .filter(item => !!item);
  };

  conversionPath = (path: string) => {
    if (path && path.indexOf('http') === 0) {
      return path;
    } else {
      return `/${path || ''}`.replace(/\/+/g, '/');
    }
  };

  checkPermissionItem = (roles: ReadonlyArray<string> | undefined, ItemDom: any) => {
    if (roles && this.props.auth.isAuthenticated && this.props.auth.role) {
      return roles.indexOf(this.props.auth.role) !== -1 ? ItemDom : null;
    }
    return ItemDom;
  };

  handleOpenChange = (openKeys: string[]) => {
    const lastOpenKey = openKeys[openKeys.length - 1];
    const isMainMenu = this.props.menuData.some(
      item => !_.isNil(lastOpenKey) && (item.key === lastOpenKey || item.path === lastOpenKey),
    );
    this.setState({
      openKeys: isMainMenu ? [lastOpenKey] : [...openKeys],
    });
  };

  render() {
    const {logo, collapsed, menuData, history, onCollapse} = this.props;
    const {openKeys} = this.state;
    // Don't show popup menu when it is been collapsed
    const menuProps = collapsed
      ? {}
      : {
          openKeys,
        };
    // if pathname can't match, use the nearest parent's key
    let selectedKeys = this.getSelectedMenuKeys(history.location.pathname);
    if (!selectedKeys.length) {
      selectedKeys = [openKeys[openKeys.length - 1]];
    }
    return (
      <Sider
        trigger={null}
        collapsible={true}
        collapsed={collapsed}
        breakpoint="lg"
        onCollapse={onCollapse}
        width={256}
        className={'sider'}
      >
        <div className={'menu-logo'}>
          <Link to="/">
            <img src={logo} alt="logo" />
            <h1>Valhalla.io</h1>
          </Link>
        </div>
        <Menu
          key="Menu"
          theme="dark"
          mode="inline"
          {...menuProps}
          onOpenChange={this.handleOpenChange}
          selectedKeys={selectedKeys}
          style={{padding: '16px 0', width: '100%'}}
        >
          {this.getNavMenuItems(menuData)}
        </Menu>
      </Sider>
    );
  }
}

export default SiderMenu;
