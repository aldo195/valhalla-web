import React from 'react';
import {Popover, Icon, Badge, Spin, Avatar, List} from 'antd';
import classNames from 'classnames';
import './NoticeIcon.css';
import noNotifications from '../../assets/no_notifications.svg';

const NoticeList = ({data, onClick, onClear, title, emptyText, clearText}) => {
  if (data.length === 0) {
    return (
      <div className={'notice-not-found'}>
        <img src={noNotifications} alt="not found" />
        <div>{emptyText}</div>
      </div>
    );
  }
  return (
    <div>
      <List className={'notice-list'}>
        {data.map((item, i) => {
          const itemCls = classNames('item', {
            read: item.read,
          });
          return (
            <List.Item className={itemCls} key={item.key || i} onClick={() => onClick(item)}>
              <List.Item.Meta
                className={'meta'}
                avatar={item.avatar ? <Avatar className={'avatar'} src={item.avatar} /> : null}
                title={
                  <div className={'title'}>
                    {item.title}
                    <div className={'extra'}>{item.extra}</div>
                  </div>
                }
                description={
                  <div>
                    <div className={'description'}>{item.description || item}</div>
                    <div className={'datetime'}>{item.datetime}</div>
                  </div>
                }
              />
            </List.Item>
          );
        })}
      </List>
      <div className={'notice-clear'} onClick={onClear}>
        {clearText}
        {title}
      </div>
    </div>
  );
};

export default class NoticeIcon extends React.PureComponent {
  onItemClick = item => {
    console.log(item); // eslint-disable-line
  };

  getNotificationBox() {
    const {loading} = this.props;
    return (
      <Spin spinning={loading} delay={0}>
        <NoticeList
          {...this.props}
          data={this.props.list}
          onClick={this.onItemClick}
          onClear={() => this.props.onClear()}
          title={this.props.title}
          emptyText={this.props.emptyText}
          clearText={this.props.clearText}
        />
      </Spin>
    );
  }
  render() {
    const {className, count, popupAlign, onPopupVisibleChange} = this.props;
    const noticeButtonClass = classNames(className, 'notice-button');
    const notificationBox = this.getNotificationBox();
    const trigger = (
      <span className={noticeButtonClass}>
        <Badge count={count}>
          <Icon type="bell" className={'notice-icon'} />
        </Badge>
      </span>
    );
    if (!notificationBox) {
      return trigger;
    }
    const popoverProps = {};
    if ('popupVisible' in this.props) {
      popoverProps.visible = this.props.popupVisible;
    }
    return (
      <Popover
        placement="bottomRight"
        content={notificationBox}
        popupClassName={'notice-popover'}
        trigger="click"
        arrowPointAtCenter
        popupAlign={popupAlign}
        onVisibleChange={onPopupVisibleChange}
        {...popoverProps}
      >
        {trigger}
      </Popover>
    );
  }
}
