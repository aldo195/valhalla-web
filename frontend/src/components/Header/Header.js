import React from 'react';
import './Header.css';
import {Link, withRouter} from 'react-router-dom';
import {Icon, Menu, Tooltip} from 'antd';
import * as routes from '../../constants/routes';
import {logoutAndRedirect} from '../../actions/auth';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import valhallaLogo from '../../assets/valhalla-logo-small.png';
import {getAuthDetails} from '../../reducers/auth';

class Header extends React.Component {
  render() {
    return (
      <div id={'navigation'}>
        <div id={'navigation-left'}>
          <Menu selectedKeys={[this.props.location.pathname]} mode={'horizontal'} theme={'dark'}>
            <Menu.Item key={routes.HOME}>
              <Link to={routes.HOME}>
                <img id={'navigation-logo'} src={valhallaLogo} alt={'Valhalla'} />
              </Link>
            </Menu.Item>
          </Menu>
        </div>
        <div id={'email-text'}>{this.props.email}</div>
        <div id={'navigation-right'}>
          <Menu mode={'horizontal'} theme={'dark'}>
            <Menu.Item key={'logout'}>
              <Tooltip title="Logout">
                <Icon type="logout" onClick={() => this.props.logoutAndRedirect(this.props.history)} />
              </Tooltip>
            </Menu.Item>
          </Menu>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return getAuthDetails(state);
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      logoutAndRedirect,
    },
    dispatch,
  );
};

Header = withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));

export {Header};
