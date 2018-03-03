import React from 'react';
import './Exception.css';
import * as routes from '../../constants/routes';
import * as exceptionTypes from '../../constants/exceptionTypes';
import classNames from 'classnames';
import unauthorizedAccessError from '../../assets/unauthorized_access_error.svg';
import notFoundError from '../../assets/not_found_error.svg';
import internalServerError from '../../assets/internal_server_error.svg';
import {Button} from 'antd';
import {Link} from 'react-router-dom';

const config = {
  [exceptionTypes.UNAUTHORIZED_ACCESS_ERROR]: {
    img: unauthorizedAccessError,
    title: '403',
    desc: 'Unauthorized Access',
  },
  [exceptionTypes.NOT_FOUND_ERROR]: {
    img: notFoundError,
    title: '404',
    desc: 'Page Not Found',
  },
  [exceptionTypes.INTERNAL_SERVER_ERROR]: {
    img: internalServerError,
    title: '500',
    desc: 'Internal Server Error',
  },
};

const Exception = ({className, type, title, desc, img, actions, ...rest}) => {
  const pageType = type in config ? type : '404';
  const classString = classNames('exception', className);
  return (
    <div className={classString} {...rest}>
      <div className={'imgBlock'}>
        <div className={'imgEle'} style={{backgroundImage: `url(${img || config[pageType].img})`}} />
      </div>
      <div className={'content'}>
        <h1>{title || config[pageType].title}</h1>
        <div className={'desc'}>{desc || config[pageType].desc}</div>
        <div className={'actions'}>
          {actions || (
            <Link to={routes.DEFAULT}>
              <Button type="primary">Return to Home Page</Button>,
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Exception;
