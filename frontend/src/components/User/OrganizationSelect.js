import React from 'react';
import './OrganizationSelect.css';
import * as api from '../../api';
import * as _ from 'lodash';
import {getAuthDetails} from '../../reducers/auth';
import connect from 'react-redux/es/connect/connect';
import {Spin, Select, Alert} from 'antd';

class OrganizationSelect extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      organizationId: null,
      organizationsList: [],
      isFetching: true,
      errorMessage: null,
    };
    this.load();
  }

  componentDidMount() {
    this.mounted = true;
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  load() {
    api.loadOrganizations(this.props.token).then(
      response => {
        if (this.mounted) {
          this.setState({
            organizationsList: response.organizations,
            isFetching: false,
            errorMessage: null,
          });
        } else {
          this.state.isFetching = false;
          this.state.organizationsList = response.organizations; // eslint-disable-line
        }
      },
      error => {
        if (this.mounted) {
          this.setState({
            organizationsList: [],
            isFetching: false,
            errorMessage: error.message,
          });
        } else {
          this.state.isFetching = false;
          this.state.errorMessage = error.message; // eslint-disable-line
        }
      },
    );
  }

  triggerChange = organizationId => {
    this.setState({organizationId});

    const onChange = this.props.onChange;
    if (onChange) {
      onChange(Object.assign({}, this.state, {organizationId}));
    }
  };

  render() {
    return (
      <div>
        <Select
          showSearch
          className={'organization-select'}
          placeholder={'Organization'}
          notFoundContent={this.state.isFetching ? <Spin size="small" /> : null}
          onChange={this.triggerChange}
        >
          {!_.isEmpty(this.state.organizationsList) &&
            this.state.organizationsList.map(organization => (
              <Select.Option key={organization.organization_id} value={organization.organization_id}>
                {organization.title}
              </Select.Option>
            ))}
        </Select>
        {this.state.errorMessage && <Alert type={'error'} message={this.state.errorMessage} showIcon />}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ...getAuthDetails(state),
  };
};

OrganizationSelect = connect(mapStateToProps)(OrganizationSelect);
export {OrganizationSelect};
