// @flow
import React from 'react';
import {Button} from 'antd';
import {Result} from '../../components/Result';
import * as routes from '../../constants/routes';
import './RegisterResult.css';
import {Link} from 'react-router-dom';

const actions = (
  <div className={'actions'}>
    <Link to={routes.DEFAULT}>
      <Button size="large">Return to home page</Button>
    </Link>
  </div>
);

type Props = {
  email: string,
};

let RegisterResult = (props: Props) => (
  <Result
    className={'registerResult'}
    type="success"
    title={<div className={'title'}>Your account：{props.email} registered successfully</div>}
    description="It's time to log in!"
    actions={actions}
    style={{marginTop: 56}}
  />
);

export default RegisterResult;
