import React from 'react';
import {Button} from 'antd';
import {Result} from '../../components/Result/Result';
import * as routes from '../../constants/routes';
import './RegisterResult.css';
import {Link} from 'react-router-dom';
import {getAuthDetails} from '../../reducers/auth';
import {connect} from 'react-redux';

const actions = (
  <div className={'actions'}>
    <Link to={routes.DEFAULT}>
      <Button size="large">Return to home page</Button>
    </Link>
  </div>
);

let RegisterResult = ({email}) => (
  <Result
    className={'registerResult'}
    type="success"
    title={<div className={'title'}>Your account：{email} registered successfully</div>}
    description="It's time to log in!"
    actions={actions}
    style={{marginTop: 56}}
  />
);

const mapStateToProps = state => {
  return {
    ...getAuthDetails(state),
  };
};

RegisterResult = connect(mapStateToProps)(RegisterResult);
export default RegisterResult;
