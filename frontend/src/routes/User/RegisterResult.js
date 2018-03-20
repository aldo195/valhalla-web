// @flow
import React from 'react';
import {Button} from 'antd';
import {Result} from '../../components/Result';
import * as routes from '../../constants/routes';
import './RegisterResult.css';
import {Link} from 'react-router-dom';
import {getAuthDetails} from '../../reducers/auth';
import {connect} from 'react-redux';
import * as types from '../../types';

const actions = (
  <div className={'actions'}>
    <Link to={routes.DEFAULT}>
      <Button size="large">Return to home page</Button>
    </Link>
  </div>
);

type Props = {
  auth: types.AuthDetails,
};

let RegisterResult = (props: Props) => (
  <Result
    className={'register-result'}
    type="success"
    title={<div className={'title'}>Your account：{props.auth.email} registered successfully</div>}
    description="It's time to log in!"
    actions={actions}
    style={{marginTop: 56}}
  />
);

const mapStateToProps = state => {
  return {
    auth: getAuthDetails(state),
  };
};

RegisterResult = connect(mapStateToProps, {})(RegisterResult);
export default RegisterResult;
