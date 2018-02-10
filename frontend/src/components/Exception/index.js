import React from 'react';
import './index.css';
import config from './typeConfig';

let ErrorPage = ({type}) => {
  const pageType = type in config ? type : '404';
  return (
    <div className={'exception'}>
      <div className={'imgBlock'}>
        <div className={'imgEle'} style={{backgroundImage: `url(${config[pageType].img})`}} />
      </div>
      <div className={'content'}>
        <h1>{config[pageType].title}</h1>
        <div className={'desc'}>{config[pageType].desc}</div>
      </div>
    </div>
  );
};

export {ErrorPage};
