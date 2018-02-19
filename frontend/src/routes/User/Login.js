import React from 'react';
import './Login.css';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {loginIfNeeded} from '../../actions/auth';
import {Button, Form, Icon, Input, Checkbox} from 'antd';
import valhallaLogo from '../../assets/valhalla-logo-big.png';
import * as routes from '../../constants/routes';
import {getAuthStatus} from '../../reducers/auth';
import {PulseLoader} from 'react-spinners';

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
        this.props.loginIfNeeded(values.email, values.password, values.remember);
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
      <div id={'login-page'}>
        <img id={'valhalla-logo'} src={valhallaLogo} alt={'Welcome to Valhalla!'} />
        <Form onSubmit={this.login} className={'login-form'}>
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
            })(<Input prefix={<Icon type={'mail'} />} placeholder={'Email'} />)}
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
            })(<Input prefix={<Icon type={'lock'} />} type={'password'} placeholder={'Password'} />)}
          </Form.Item>
          {this.props.errorMessage && (
            <div className={'error-message-area'}>
              <p>{this.props.errorMessage}</p>
            </div>
          )}
          <Form.Item className={'submit-button-item'}>
            {getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: true,
            })(<Checkbox>Remember me</Checkbox>)}
            <a className="login-form-forgot" href="">
              Forgot password
            </a>
            <Button type={'primary'} htmlType={'submit'} className={'login-form-button'}>
              Log in
            </Button>
            Or &nbsp;<a href={routes.REGISTER}>register now!</a>
          </Form.Item>
        </Form>
        <PulseLoader color={'#1890ff'} loading={this.props.isFetching} />
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

const Login = connect(mapStateToProps, mapDispatchToProps)(Form.create()(LoginForm));
export {Login};
