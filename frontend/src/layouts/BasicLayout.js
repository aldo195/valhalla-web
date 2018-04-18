// @flow
import React from 'react';
import * as types from '../types';
import {Layout, Icon} from 'antd';
import DocumentTitle from 'react-document-title';
import {Route, Redirect, Switch} from 'react-router-dom';
import {GlobalHeader} from '../components/GlobalHeader/index';
import {GlobalFooter} from '../components/GlobalFooter/index';
import {DrawerSiderMenu} from '../components/SiderMenu';
import * as routes from '../constants/routes';
import {getRoutes} from '../utils/routing';
import {getMenuData} from '../common/menu';
import logo from '../assets/valhalla-logo-small.png';
import {enquireScreen} from '../utils/media';
import {AuthorizedRoute} from '../components/AuthorizedRoute';
import {NotFoundError} from '../routes/Exception';

const {Content} = Layout;

// Set default redirect to first child, for every parent in the menu.
const redirectData = [];
const getRedirect = item => {
  if (item && item.children) {
    if (item.children[0] && item.children[0].path) {
      redirectData.push({
        from: `/${item.path}`,
        to: `/${item.children[0].path}`,
      });
      item.children.forEach(children => {
        getRedirect(children);
      });
    }
  }
};
getMenuData().forEach(getRedirect);

let isMobile;
enquireScreen(result => {
  isMobile = result;
}, 'only screen and (max-width: 767.99px)');

type Props = {
  location: {
    pathname: string;
  };
  match: {
    path: string;
    url: string;
    isExact: boolean;
  };
  routerData: types.RouterData;
};

type State = {
  isMobile: boolean;
  menuCollapsed: boolean;
};

export default class BasicLayout extends React.PureComponent<Props, State> {
  state = {
    isMobile,
    menuCollapsed: false,
  };

  componentDidMount() {
    enquireScreen(mobile => {
      this.setState({
        isMobile: mobile,
      });
    });
  }

  getPageTitle() {
    const {routerData, location} = this.props;
    const {pathname} = location;
    let title = 'Valhalla.io';
    if (routerData[pathname] && routerData[pathname].name) {
      title = `${routerData[pathname].name} - Valhalla.io`;
    }
    return title;
  }

  handleMenuCollapse = (menuCollapsed: boolean) => {
    this.setState({
      menuCollapsed,
    });
  };

  render() {
    const {routerData, match} = this.props;
    const layout = (
      <Layout>
        <DrawerSiderMenu
          logo={logo}
          menuData={getMenuData()}
          collapsed={this.state.menuCollapsed}
          isMobile={this.state.isMobile}
          onCollapse={this.handleMenuCollapse}
        />
        <Layout>
          <GlobalHeader
            logo={logo}
            menuCollapsed={this.state.menuCollapsed}
            isMobile={this.state.isMobile}
            onMenuCollapse={this.handleMenuCollapse}
          />
          <Content style={{margin: '24px 24px 0', height: '100%'}}>
            <Switch>
              {redirectData.map(item => <Redirect key={item.from} exact from={item.from} to={item.to} />)}
              {getRoutes(match.path, routerData).map(item => (
                <AuthorizedRoute
                  key={item.key}
                  path={item.path}
                  component={item.component}
                  exact={item.exact}
                  roles={item.roles}
                  redirectPath={routes.NOT_FOUND_ERROR}
                />
              ))}
              <Redirect exact from="/" to={routes.ANALYSIS} />
              <Route render={NotFoundError} />
            </Switch>
          </Content>
          <GlobalFooter
            copyright={
              <div>
                Copyright <Icon type="copyright" /> 2018 Valhalla.io, Inc.
              </div>
            }
          />
        </Layout>
      </Layout>
    );

    return <DocumentTitle title={this.getPageTitle()}>{layout}</DocumentTitle>;
  }
}
