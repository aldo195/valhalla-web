// @flow
import React from 'react';
import './NumberInfo.css';

type Props = {
  title: string,
  subTitle?: string,
  passing: number,
  failing: number,
  pending: number,
};

const NumberInfo = (props: Props) => {
  const {title, subTitle, passing, failing, pending} = props;

  return (
    <div className={'numberInfo'}>
      {title && <div className={'numberInfoTitle'}>{title}</div>}
      {subTitle && <div className={'numberInfoSubTitle'}>{subTitle}</div>}
      <p>Passing: {passing}</p>
      <p>Failing: {failing}</p>
      <p>Pending: {pending}</p>
    </div>
  );
};

export default NumberInfo;
