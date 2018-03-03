import React from 'react';
import classNames from 'classnames';
import {Icon} from 'antd';
import './Result.css';

type Props = {
  className: string,
  type: string,
  title: string,
  description: string,
  extra: string,
  actions: Array<div>,
};

const Result = (props: Props) => {
  const {className, type, title, description, extra, actions} = props;

  const iconMap = {
    error: <Icon className={'error'} type="close-circle" />,
    success: <Icon className={'success'} type="check-circle" />,
  };
  const clsString = classNames('result', className);
  return (
    <div className={clsString}>
      <div className={'icon'}>{iconMap[type]}</div>
      <div className={'title'}>{title}</div>
      {description && <div className={'description'}>{description}</div>}
      {extra && <div className={'extra'}>{extra}</div>}
      {actions && <div className={'actions'}>{actions}</div>}
    </div>
  );
};

export default Result;
