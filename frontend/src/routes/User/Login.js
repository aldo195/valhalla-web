import React from 'react';
import './Login.css';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {loginIfNeeded} from '../../actions/auth';
import {Button, Form, Icon, Input, Checkbox, Alert} from 'antd';
import * as routes from '../../constants/routes';
import {getAuthStatus} from '../../reducers/auth';
import {Link, withRouter} from 'react-router-dom';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMessage: props.errorMessage,
    };
  }

  login = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.loginIfNeeded(values.email, values.password, values.remember, this.props.history);
      } else {
        this.setState({
          errorMessage: err,
        });
      }
    });
  };

  validatePassword = (rule, value, callback) => {
    if (!value || value.length >= 8) {
      callback();
    } else {
      callback('Your password must contain at least 8 characters');
    }
  };

  render() {
    const {getFieldDecorator} = this.props.form;
    return (
      <div className={'main'}>
        <Form className={'login'} onSubmit={this.login}>
          <Form.Item>
            {getFieldDecorator('email', {
              rules: [
                {
                  required: true,
                  message: 'Please enter your email!',
                },
                {
                  type: 'email',
                  message: 'Sorry, this is not a valid email',
                },
              ],
            })(<Input prefix={<Icon className={'prefixIcon'} type={'mail'} />} placeholder={'Email'} />)}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [
                {
                  required: true,
                  message: 'Please enter your Password!',
                },
                {
                  validator: this.validatePassword,
                },
              ],
            })(
              <Input
                prefix={<Icon className={'prefixIcon'} type={'lock'} />}
                type={'password'}
                placeholder={'Password'}
              />,
            )}
          </Form.Item>
          {this.props.errorMessage && <Alert type={'error'} message={this.props.errorMessage} showIcon />}
          <Form.Item style={{marginBottom: 0}}>
            {getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: true,
            })(<Checkbox>Remember me</Checkbox>)}
            <a style={{float: 'right'}} href="">
              Forgot password
            </a>
          </Form.Item>
          <Form.Item style={{marginBottom: '12px'}}>
            <Button type={'primary'} htmlType={'submit'} loading={this.props.isFetching} className={'formButton'}>
              Log in
            </Button>
          </Form.Item>
          <Button type={'default'} className={'formButton'}>
            <Link to={routes.REGISTER}>Sign Up</Link>
          </Button>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return getAuthStatus(state);
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      loginIfNeeded,
    },
    dispatch,
  );
};

const Login = withRouter(connect(mapStateToProps, mapDispatchToProps)(Form.create()(LoginForm)));
export default Login;
