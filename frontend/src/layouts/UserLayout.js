import React from 'react';
import './UserLayout.css';
import DocumentTitle from 'react-document-title';
import {Icon} from 'antd';
import {GlobalFooter} from '../components/GlobalFooter';
import logo from '../assets/valhalla-logo-small.png';
import {Link, Redirect, Route, Switch} from 'react-router-dom';
import * as routes from '../constants/routes';
import {getRoutes} from '../utils/routing';

const links = [
  {
    key: 'help',
    title: 'Help',
    href: '',
  },
  {
    key: 'privacy',
    title: 'Privacy',
    href: '',
  },
  {
    key: 'terms',
    title: 'Terms',
    href: '',
  },
];

const copyright = (
  <div>
    Copyright <Icon type="copyright" /> 2018 Valhalla.io
  </div>
);

export class UserLayout extends React.PureComponent {
  getPageTitle() {
    const {routerData, location} = this.props;
    const {pathname} = location;
    let title = 'Valhalla.io';
    if (routerData[pathname] && routerData[pathname].name) {
      title = `${routerData[pathname].name} - ${title}`;
    }
    return title;
  }

  render() {
    const {routerData, match} = this.props;
    return (
      <DocumentTitle title={this.getPageTitle()}>
        <div className={'container'}>
          <div className={'content'}>
            <div className={'top'}>
              <div className={'header'}>
                <Link to="/">
                  <img alt="logo" className={'logo'} src={logo} />
                  <span className={'title'}>Valhalla.io</span>
                </Link>
              </div>
              <div className={'desc'}>Security Controls Validation Platform</div>
            </div>
            <Switch>
              {getRoutes(match.path, routerData).map(item => (
                <Route key={item.key} path={item.path} component={item.component} exact={item.exact} />
              ))}
              <Redirect exact from={routes.USER} to={routes.LOGIN} />
            </Switch>
          </div>
          <GlobalFooter links={links} copyright={copyright} />
        </div>
      </DocumentTitle>
    );
  }
}

export default UserLayout;
