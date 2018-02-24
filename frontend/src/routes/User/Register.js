import React from 'react';
import './Register.css';
import '../../index.css';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Alert, Button, Form, Icon, Input} from 'antd';
import {registerIfNeeded} from '../../actions/auth';
import {getAuthStatus} from '../../reducers/auth';
import {OrganizationSelect} from '../../components/User';
import {withRouter} from 'react-router-dom';

class RegisterForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMessage: props.errorMessage,
      passwordCopyDirty: false,
    };
  }

  register = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.registerIfNeeded(
          values.name,
          values.email,
          values.organization.organizationId,
          values.password,
          this.props.history,
        );
      } else {
        this.setState({
          errorMessage: err,
        });
      }
    });
  };

  validatePassword = (rule, value, callback) => {
    const form = this.props.form;
    // Make sure password copy matches the new password.
    if (value && this.state.passwordCopyDirty) {
      form.validateFields(['passwordCopy'], {force: true});
    }
    // Validate the password itself.
    if (!value || value.length >= 8) {
      callback();
    } else {
      callback('Your password must contain at least 8 characters');
    }
  };

  handlePasswordCopyBlur = e => {
    const value = e.target.value;
    // We need to check password copy only after it has been changed for the first time.
    this.setState({
      passwordCopyDirty: this.state.passwordCopyDirty || !!value,
    });
  };

  validatePasswordCopy = (rule, value, callback) => {
    const form = this.props.form;
    if (!value || value === form.getFieldValue('password')) {
      callback();
    } else {
      callback('Your passwords must match');
    }
  };

  render() {
    const {getFieldDecorator} = this.props.form;

    return (
      <div className={'main'}>
        <Form onSubmit={this.register} className={'register'}>
          <Form.Item hasFeedback>
            {getFieldDecorator('name', {
              rules: [
                {
                  required: true,
                  message: 'Please enter your name!',
                },
              ],
            })(<Input prefix={<Icon className={'prefixIcon'} type={'user'} />} placeholder={'Name'} />)}
          </Form.Item>
          <Form.Item hasFeedback>
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
          <Form.Item hasFeedback>
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
          <Form.Item hasFeedback>
            {getFieldDecorator('passwordCopy', {
              rules: [
                {
                  required: true,
                  message: 'Please confirm your Password!',
                },
                {
                  validator: this.validatePasswordCopy,
                },
              ],
            })(
              <Input
                prefix={<Icon className={'prefixIcon'} type={'lock'} />}
                type={'password'}
                placeholder={'Confirm Password'}
                onBlur={this.handlePasswordCopyBlur}
              />,
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('organization', {
              rules: [
                {
                  required: true,
                  message: 'Please select your organization!',
                },
              ],
            })(<OrganizationSelect />)}
          </Form.Item>
          {this.props.errorMessage && <Alert type={'error'} message={this.props.errorMessage} showIcon />}
          <Form.Item style={{marginBottom: '12px'}}>
            <Button type={'primary'} htmlType={'submit'} className={'formButton'} loading={this.props.isFetching}>
              Register
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ...getAuthStatus(state),
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      registerIfNeeded,
    },
    dispatch,
  );
};

const Register = withRouter(connect(mapStateToProps, mapDispatchToProps)(Form.create()(RegisterForm)));
export default Register;
