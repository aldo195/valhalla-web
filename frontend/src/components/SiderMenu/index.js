// @flow
import React from 'react';
import DrawerMenu from 'rc-drawer-menu';
import SiderMenu from './SiderMenu';
import * as types from '../../types';
import {getAuthDetails} from '../../reducers/auth';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import type {RouterHistory} from 'react-router-dom';

type Props = {
  isMobile: boolean,
  logo: string,
  menuData: types.MenuData,
  collapsed: boolean,
  onCollapse: boolean => void,
  history: RouterHistory,
  auth: types.AuthDetails,
};

let DrawerSiderMenu = (props: Props) =>
  props.isMobile ? (
    <DrawerMenu
      parent={null}
      level={null}
      iconChild={null}
      open={!props.collapsed}
      onMaskClick={() => {
        props.onCollapse(true);
      }}
      width="256px"
    >
      <SiderMenu {...props} collapsed={false} />
    </DrawerMenu>
  ) : (
    <SiderMenu {...props} />
  );

const mapStateToProps = state => {
  return {
    auth: getAuthDetails(state),
  };
};

DrawerSiderMenu = withRouter(connect(mapStateToProps, {})(DrawerSiderMenu));
export {DrawerSiderMenu};
