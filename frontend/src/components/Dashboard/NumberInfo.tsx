import React from 'react';
import './NumberInfo.css';

interface NumberInfoProps {
  title: string;
  subTitle?: string;
  passing: number;
  failing: number;
  pending: number;
}

const NumberInfo = (props: NumberInfoProps) => {
  const {title, subTitle, passing, failing, pending} = props;

  return (
    <div className={'number-info'}>
      {title && <div className={'title'}>{title}</div>}
      {subTitle && <div className={'subtitle'}>{subTitle}</div>}
      <p>Passing: {passing}</p>
      <p>Failing: {failing}</p>
      <p>Pending: {pending}</p>
    </div>
  );
};

export default NumberInfo;
