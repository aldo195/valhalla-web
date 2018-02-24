import React from 'react';
import DrawerMenu from 'rc-drawer-menu';
import SiderMenu from './SiderMenu';

const DrawerSiderMenu = props =>
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

export {DrawerSiderMenu};
