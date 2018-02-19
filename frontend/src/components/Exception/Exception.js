import React from 'react';
import './Exception.css';
import unauthorizedAccessError from '../../assets/unauthorized_access_error.svg';
import notFoundError from '../../assets/not_found_error.svg';
import internalServerError from '../../assets/internal_server_error.svg';
import {Button} from 'antd';

const config = {
  403: {
    img: unauthorizedAccessError,
    title: '403',
    desc: 'Unauthorized Access',
  },
  404: {
    img: notFoundError,
    title: '404',
    desc: 'Page Not Found',
  },
  500: {
    img: internalServerError,
    title: '500',
    desc: 'Internal Server Error',
  },
};

let Exception = ({className, linkElement = 'a', type, title, desc, img, actions, ...rest}) => {
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
          {actions ||
            createElement(
              linkElement,
              {
                to: '/',
                href: '/',
              },
              <Button type="primary">Return to Home Page</Button>,
            )}
        </div>
      </div>
    </div>
  );
};

export {Exception};
