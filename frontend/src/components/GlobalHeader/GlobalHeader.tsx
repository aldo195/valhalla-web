import {Avatar, Divider, Dropdown, Icon, Layout, Menu, Spin, Tag, Tooltip} from 'antd';
import History from 'history';
import {Debounce} from 'lodash-decorators';
import moment from 'moment';
import React from 'react';
import {connect} from 'react-redux';
import {Link, withRouter} from 'react-router-dom';
import {bindActionCreators, Dispatch} from 'redux';
import {ThunkAction} from 'redux-thunk';
import {logoutAndRedirect} from '../../actions/auth';
import {clearNotificationsIfNeeded, loadNotificationsIfNeeded} from '../../actions/notifications';
import * as actionTypes from '../../actions/types';
import {getAuthDetails} from '../../reducers/auth';
import {getNotifications} from '../../reducers/notifications';
import {State} from '../../reducers/types';
import * as stateTypes from '../../reducers/types';
import {HeaderSearch} from '../HeaderSearch';
import {NoticeIcon} from '../NoticeIcon';
import './GlobalHeader.css';

const {Header} = Layout;

interface OwnProps {
  isMobile: boolean;
  menuCollapsed: boolean;
  onMenuCollapse: (menuCollapsed: boolean) => void;
  logo: string;
}

interface DispatchProps {
  loadNotificationsIfNeeded: (token: string | null) => ThunkAction<actionTypes.LoadNotificationsActions, State, void>;
  clearNotificationsIfNeeded: (token: string | null) => ThunkAction<actionTypes.ClearNotificationsActions, State, void>;
  logoutAndRedirect: (history: History) => ThunkAction<actionTypes.LogoutAction, State, void>;
}

interface StateProps {
  auth: stateTypes.AuthDetails;
  notifications: stateTypes.NotificationsState;
}

interface RouterProps {
  history: History;
}

type GlobalHeaderProps = OwnProps & DispatchProps & StateProps & RouterProps;

class GlobalHeader extends React.PureComponent<GlobalHeaderProps> {
  componentWillMount() {
    this.props.loadNotificationsIfNeeded(this.props.auth.token);
  }

  getNotificationsData() {
    const {notifications} = this.props;
    if (notifications.errorMessage) {
      return [notifications.errorMessage];
    } else if (notifications.notifications.length === 0) {
      return [];
    }

    return notifications.notifications.map(notice => {
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
  }

  toggle = () => {
    const {menuCollapsed, onMenuCollapse} = this.props;
    onMenuCollapse(!menuCollapsed);
    this.triggerResizeEvent();
  };

  @Debounce(600)
  triggerResizeEvent() {
    const event = document.createEvent('HTMLEvents');
    event.initEvent('resize', true, false);
    window.dispatchEvent(event);
  }

  handleNoticeClear = () => {
    this.props.clearNotificationsIfNeeded(this.props.auth.token);
  };

  handleNoticeVisibleChange = (visible: boolean) => {
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
        <Menu.Item disabled={true}>
          <Icon type="user" />Profile
        </Menu.Item>
        <Menu.Item disabled={true}>
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
          <Link to="/" className={'header-logo'}>
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

const mapStateToProps = (state: State) => {
  return {
    auth: getAuthDetails(state),
    notifications: getNotifications(state),
  };
};

const mapDispatchToProps = (dispatch: Dispatch<State>) => {
  return bindActionCreators(
    {
      loadNotificationsIfNeeded,
      clearNotificationsIfNeeded,
      logoutAndRedirect,
    },
    dispatch,
  );
};

const ConnectedGlobalHeader = withRouter(
  connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps)(GlobalHeader),
);
export default ConnectedGlobalHeader;
