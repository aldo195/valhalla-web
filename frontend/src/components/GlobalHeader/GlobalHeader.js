// @flow
import React from 'react';
import * as types from '../../types';
import {Menu, Icon, Spin, Tag, Dropdown, Avatar, Divider, Tooltip, Layout} from 'antd';
import moment from 'moment';
import * as _ from 'lodash';
import {NoticeIcon} from '../NoticeIcon';
import {HeaderSearch} from '../HeaderSearch';
import './GlobalHeader.css';
import {Link, withRouter} from 'react-router-dom';
import type {RouterHistory} from 'react-router-dom';
import {getAuthDetails} from '../../reducers/auth';
import {connect} from 'react-redux';
import {getNotifications} from '../../reducers/notifications';
import {bindActionCreators} from 'redux';
import {logoutAndRedirect} from '../../actions/auth';
import {clearNotificationsIfNeeded, loadNotificationsIfNeeded} from '../../actions/notifications';

const {Header} = Layout;

type Props = {
  auth: types.AuthDetails,
  isMobile: boolean,
  menuCollapsed: boolean,
  onMenuCollapse: boolean => void,
  logo: string,
  notifications: types.Notifications,
  history: RouterHistory,
  loadNotificationsIfNeeded: string => types.ThunkAction,
  clearNotificationsIfNeeded: string => types.ThunkAction,
  logoutAndRedirect: RouterHistory => types.ThunkAction,
};

class GlobalHeader extends React.PureComponent<Props> {
  componentWillMount() {
    this.props.loadNotificationsIfNeeded(this.props.auth.token);
  }

  componentWillUnmount() {
    this.triggerResizeEvent.cancel();
  }

  getNotificationsData() {
    const {notifications} = this.props;
    if (notifications.errorMessage) {
      return [notifications.errorMessage];
    } else if (notifications.notifications.length === 0) {
      return [];
    }

    const newNotifications = notifications.notifications.map(notice => {
      const newNotice = {...notice};
      if (newNotice.datetime) {
        newNotice.datetime = moment(notice.datetime).fromNow();
      }
      // Transform ID to item key.
      newNotice.key = newNotice.id;

      if (newNotice.extra && newNotice.status) {
        const color = {
          todo: '',
          processing: 'blue',
          urgent: 'red',
          doing: 'gold',
        }[newNotice.status];
        newNotice.extra = (
          <Tag color={color} style={{marginRight: 0}}>
            {newNotice.extra}
          </Tag>
        );
      }
      return newNotice;
    });

    return newNotifications;
  }

  toggle = () => {
    const {menuCollapsed, onMenuCollapse} = this.props;
    onMenuCollapse(!menuCollapsed);
    this.triggerResizeEvent();
  };

  triggerResizeEvent = _.debounce(() => {
    const event = document.createEvent('HTMLEvents');
    event.initEvent('resize', true, false);
    window.dispatchEvent(event);
  }, 600);

  handleNoticeClear = () => {
    this.props.clearNotificationsIfNeeded(this.props.auth.token);
  };

  handleNoticeVisibleChange = visible => {
    if (visible) {
      this.props.loadNotificationsIfNeeded(this.props.auth.token);
    }
  };

  handleMenuClick = ({key}) => {
    if (key === 'logout') {
      this.props.logoutAndRedirect(this.props.history);
    }
  };

  render() {
    const {auth, notifications, menuCollapsed, isMobile, logo} = this.props;
    const menu = (
      <Menu className={'menu'} selectedKeys={[]} onClick={this.handleMenuClick}>
        <Menu.Item disabled>
          <Icon type="user" />Profile
        </Menu.Item>
        <Menu.Item disabled>
          <Icon type="setting" />Settings
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="logout">
          <Icon type="logout" />Sign out
        </Menu.Item>
      </Menu>
    );
    const notificationsData = this.getNotificationsData();
    return (
      <Header className={'header'}>
        {isMobile && [
          <Link to="/" className={'headerLogo'} key="logo">
            <img src={logo} alt="logo" width="32" />
          </Link>,
          <Divider type="vertical" key="line" />,
        ]}
        <Icon className={'trigger'} type={menuCollapsed ? 'menu-unfold' : 'menu-fold'} onClick={this.toggle} />
        <div className={'right'}>
          <HeaderSearch
            className={'action search'}
            placeholder="Search..."
            onSearch={value => {
              console.log('input', value); // eslint-disable-line
            }}
            onPressEnter={value => {
              console.log('enter', value); // eslint-disable-line
            }}
          />
          <Tooltip title="AntPro Docs">
            <a
              target="_blank"
              href="http://pro.ant.design/docs/getting-started"
              rel="noopener noreferrer"
              className={'action'}
            >
              <Icon type="question-circle-o" />
            </a>
          </Tooltip>
          <NoticeIcon
            className={'action'}
            count={notificationsData.length}
            onClear={this.handleNoticeClear}
            onPopupVisibleChange={this.handleNoticeVisibleChange}
            loading={notifications.isFetching}
            popupAlign={{offset: [20, -16]}}
            list={notificationsData}
            title={'Notifications'}
            emptyText={'No notifications'}
            clearText={'Clear'}
          />
          {auth.email ? (
            <Dropdown overlay={menu}>
              <span className={'action account'}>
                <Avatar size="small" className={'avatar'} src={auth.avatar} />
                <span className={'name'}>{auth.email}</span>
              </span>
            </Dropdown>
          ) : (
            <Spin size="small" style={{marginLeft: 8}} />
          )}
        </div>
      </Header>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: getAuthDetails(state),
    notifications: getNotifications(state),
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      loadNotificationsIfNeeded,
      clearNotificationsIfNeeded,
      logoutAndRedirect,
    },
    dispatch,
  );
};

GlobalHeader = withRouter(connect(mapStateToProps, mapDispatchToProps)(GlobalHeader));
export default GlobalHeader;
