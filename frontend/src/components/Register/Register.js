import React from 'react';
import './Register.css';
import '../../index.css';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as _ from "lodash";
import {Button, Form, Icon, Input, Select, Spin} from "antd";
import valhallaLogo from "../../assets/valhalla-logo-big.png";
import {registerIfNeeded} from "../../actions/auth";
import {getAuthStatus} from "../../reducers/auth";
import {withRouter} from "react-router-dom";
import { PulseLoader } from 'react-spinners';
import {loadOrganizationsIfNeeded} from "../../actions/organizations";
import {getOrganizations} from "../../reducers/organizations";

class RegisterForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMessage: props.errorMessage,
      passwordCopyDirty: false
    };
  }

  componentDidMount() {
    this.props.loadOrganizationsIfNeeded(this.props.token, this.props.history);
  }

  register = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.registerIfNeeded(values.name, values.email, values.organization, values.password,
          this.props.history);
      } else {
        this.setState({
          errorMessage: err
        });
      }
    });
  };

  validatePassword = (rule, value, callback) => {
    const form = this.props.form;
    // Make sure password copy matches the new password.
    if (value && this.state.passwordCopyDirty) {
      form.validateFields(['passwordCopy'], { force: true });
    }
    // Validate the password itself.
    if (!value || value.length >= 8) {
      callback();
    } else {
      callback('Your password must contain at least 8 characters')
    }
  };

  handlePasswordCopyBlur = (e) => {
    const value = e.target.value;
    // We need to check password copy only after it has been changed for the first time.
    this.setState({
      passwordCopyDirty: this.state.passwordCopyDirty || !!value
    });
  };

  validatePasswordCopy = (rule, value, callback) => {
    const form = this.props.form;
    if (!value || value === form.getFieldValue('password')) {
      callback();
    } else {
      callback('Your passwords must match')
    }
  };

  render() {
    const organizations = this.props.organizations.organizations;
    const { getFieldDecorator } = this.props.form;

    return (
      <div id={"register-page"}>
        <img id={"valhalla-logo"} src={valhallaLogo} alt={"Welcome to Valhalla!"}/>
        <Form onSubmit={this.register} className={"register-form"}>
          <Form.Item hasFeedback>
            {getFieldDecorator('name', {
              rules: [{
                required: true, message: 'Please enter your name!'
              }]
            })(
              <Input prefix={<Icon type={"user"} />} placeholder={"Name"} />
            )}
          </Form.Item>
          <Form.Item hasFeedback>
            {getFieldDecorator('email', {
              rules: [{
                required: true, message: 'Please enter your email!'
              }, {
                type: 'email', message: 'Sorry, this is not a valid email'
              }]
            })(
              <Input prefix={<Icon type={"mail"} />} placeholder={"Email"} />
            )}
          </Form.Item>
          <Form.Item hasFeedback>
            {getFieldDecorator('password', {
              rules: [{
                required: true, message: 'Please enter your Password!'
              }, {
                validator: this.validatePassword
              }]
            })(
              <Input prefix={<Icon type={"lock"} />} type={"password"} placeholder={"Password"} />
            )}
          </Form.Item>
          <Form.Item hasFeedback>
            {getFieldDecorator('passwordCopy', {
              rules: [{
                required: true, message: 'Please confirm your Password!'
              }, {
                validator: this.validatePasswordCopy
              }]
            })(
              <Input prefix={<Icon type={"lock"} />} type={"password"} placeholder={"Confirm Password"}
                     onBlur={this.handlePasswordCopyBlur} />
            )}
          </Form.Item>
          <Form.Item hasFeedback>
            {getFieldDecorator('organizations', {
              rules: [{
                required: true, message: 'Please select your organization!'
              }]
            })(
              <div>
                <Select
                  className={"organization-select"}
                  placeholder={"Organization"}
                  notFoundContent={this.props.organizations.isFetching ? <Spin size="small" /> : null}
                >
                  {!_.isEmpty(organizations) && organizations.map((organization) =>
                    <Select.Option value={organization.organization_id}>{organization.title}</Select.Option>
                  )}
                </Select>
                {this.props.organizations.errorMessage && <div className={"error-message-area"}>
                  <p>{this.props.organizations.errorMessage}</p>
                </div>}
              </div>
            )}
          </Form.Item>
          {this.props.errorMessage && <div className={"error-message-area"}>
            <p>{this.props.errorMessage}</p>
          </div>}
          <Form.Item className={"submit-button-item"}>
            <Button type={"primary"} htmlType={"submit"} className={"register-form-button"}>
              Register
            </Button>
          </Form.Item>
        </Form>
        <PulseLoader color={"#1890ff"} loading={this.props.isFetching}/>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ...getAuthStatus(state),
    organizations: getOrganizations(state)
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    loadOrganizationsIfNeeded,
    registerIfNeeded
  }, dispatch);
};

const Register = withRouter(connect(mapStateToProps, mapDispatchToProps)(Form.create()(RegisterForm)));
export {Register};
