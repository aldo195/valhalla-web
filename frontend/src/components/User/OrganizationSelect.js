// @flow
import React from 'react';
import './OrganizationSelect.css';
import '../../index.css';
import * as types from '../../types';
import * as api from '../../api';
import * as _ from 'lodash';
import {getAuthDetails} from '../../reducers/auth';
import connect from 'react-redux/es/connect/connect';
import {Spin, Select, Alert} from 'antd';

type State = {
  organizationId: number | null,
  organizationsList: Array<{
    title: string,
    organization_id: number,
  }>,
  isFetching: boolean,
  errorMessage: string,
};

type Props = {
  onChange: State => void,
  auth: types.AuthDetails,
};

class OrganizationSelect extends React.Component<Props, State> {
  state = {
    organizationId: null,
    organizationsList: [],
    isFetching: true,
    errorMessage: '',
  };

  mounted: boolean;

  componentDidMount() {
    this.mounted = true;
    this.fetchData();
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  async fetchData() {
    try {
      const response = await api.loadOrganizations(this.props.auth.token);
      if (this.mounted) {
        this.setState({
          organizationsList: response.organizations,
          isFetching: false,
          errorMessage: '',
        });
      }
    } catch (error) {
      if (this.mounted) {
        this.setState({
          organizationsList: [],
          isFetching: false,
          errorMessage: error.message,
        });
      }
    }
  }

  triggerChange = organizationId => {
    this.setState({organizationId});

    const onChange = this.props.onChange;
    if (onChange) {
      onChange({
        ...this.state,
        organizationId,
      });
    }
  };

  render() {
    return (
      <div>
        <Select
          showSearch
          className={'organization-select'}
          placeholder={'Organization'}
          notFoundContent={this.state.isFetching ? <Spin size="small" className={'global-spin'} /> : null}
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
    auth: getAuthDetails(state),
  };
};

export default connect(mapStateToProps, {})(OrganizationSelect);
