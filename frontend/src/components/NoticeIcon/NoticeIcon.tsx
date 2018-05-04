import {Avatar, Badge, Icon, List, Popover, Spin} from 'antd';
import classNames from 'classnames';
import React from 'react';
import noNotifications from '../../assets/no_notifications.svg';
import './NoticeIcon.css';

type NotificationsList = Array<{
  title: string;
  description?: string;
  datetime: string;
  extra?: string;
  key?: string;
  avatar?: string;
  read: boolean;
}>;

interface ListProps {
  data: NotificationsList;
  title: string;
  emptyText: string;
  clearText: string;
  onClear: () => void;
}

const NoticeList = (props: ListProps) => {
  const {data, onClear, title, emptyText, clearText} = props;

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
      <List className={'notice-list'} dataSource={null} renderItem={null}>
        {data.map((item, i) => {
          const itemCls = classNames('item', {
            read: item.read,
          });
          return (
            <List.Item className={itemCls} key={item.key || i}>
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
                    <div className={'description'}>{item.description}</div>
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

interface Props {
  loading: boolean;
  list: NotificationsList;
  title: string;
  emptyText: string;
  clearText: string;
  className: string;
  count: number;
  popupVisible: boolean;
  onPopupVisibleChange: (isVisible: boolean) => void;
  onClear: () => void;
}

export default class NoticeIcon extends React.PureComponent<Props> {
  getNotificationBox() {
    const {loading} = this.props;
    return (
      <Spin spinning={loading} delay={0}>
        <NoticeList
          data={this.props.list}
          onClear={() => this.props.onClear()}
          title={this.props.title}
          emptyText={this.props.emptyText}
          clearText={this.props.clearText}
        />
      </Spin>
    );
  }
  render() {
    const {className, count, onPopupVisibleChange} = this.props;
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
    const popoverProps = {
      visible: false,
    };
    if ('popupVisible' in this.props) {
      popoverProps.visible = this.props.popupVisible;
    }
    return (
      <Popover
        placement="bottomRight"
        content={notificationBox}
        overlayClassName={'notice-popover'}
        trigger="click"
        arrowPointAtCenter={true}
        onVisibleChange={onPopupVisibleChange}
        {...popoverProps}
      >
        {trigger}
      </Popover>
    );
  }
}