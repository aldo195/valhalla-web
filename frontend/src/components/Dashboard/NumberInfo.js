import React from 'react';
import './NumberInfo.css';

const NumberInfo = ({title, subTitle, passing, failing, pending}) => (
  <div className={'numberInfo'}>
    {title && <div className={'numberInfoTitle'}>{title}</div>}
    {subTitle && <div className={'numberInfoSubTitle'}>{subTitle}</div>}
    <p>Passing: {passing}</p>
    <p>Failing: {failing}</p>
    <p>Pending: {pending}</p>
  </div>
);

export default NumberInfo;
