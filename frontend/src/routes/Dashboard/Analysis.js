// @flow
import React from 'react';
import './Analysis.css';
import '../../index.css';
import * as exceptionTypes from '../../constants/exceptionTypes';
import {Col, Row, Card, Tabs, Spin, Alert} from 'antd';
import {DetailsTab} from '../../components/Dashboard/index';
import {connect} from 'react-redux';
import {getAuthDetails} from '../../reducers/auth';
import {bindActionCreators} from 'redux';
import {loadRulesIfNeeded} from '../../actions/rules';
import {getOrganizationIfNeeded} from '../../actions/organization';
import {getOrganization} from '../../reducers/organization';
import {getRuleStats} from '../../reducers/rules';
import Exception from '../../components/Exception/Exception';
import * as types from '../../types';

type Props = {
  auth: types.AuthDetails;
  organization: types.Organization;
  ruleStats: types.RuleStats;
  getOrganizationIfNeeded: (number, string) => types.ThunkAction;
  loadRulesIfNeeded: (string) => types.ThunkAction;
};

type State = {
  currentTabKey: string;
};

type InfoProps = {
  title: string;
  value: string;
  bordered?: boolean;
};

class Analysis extends React.PureComponent<Props, State> {
  state = {
    currentTabKey: '',
  };

  fetchData() {
    const {auth} = this.props;
    this.props.getOrganizationIfNeeded(auth.organizationId, auth.token);
    this.props.loadRulesIfNeeded(auth.token);
  }

  componentDidMount() {
    this.fetchData();
  }

  handleTabChange = key => {
    this.setState({
      currentTabKey: key,
    });
  };

  render() {
    const {organization} = this.props;
    const {ruleStats} = this.props;

    let activeKey = this.state.currentTabKey;
    if (!activeKey && ruleStats.categories[0]) {
      activeKey = ruleStats.categories[0].name;
    }

    const validationPercentage = `${Math.floor(ruleStats.validation * 100)}%`;

    const Info = (props: InfoProps) => {
      const {title, value, bordered} = props;
      return (
        <div className={'header-info'}>
          <span>{title}</span>
          <p>{value}</p>
          {bordered && <em />}
        </div>
      );
    };

    // Make sure organization is loaded first.
    if (organization.errorMessage) {
      return (
        <Exception
          type={exceptionTypes.NOT_FOUND_ERROR}
          desc={organization.errorMessage}
          style={{minHeight: 500, height: '80%'}}
        />
      );
    }

    return (
      <div>
        {organization.isFetching ? (
          <Spin size="large" className={'global-spin'} />
        ) : (
          <Card title={`${organization.details.title} Security Policy`} className={'card'} bordered={true}>
            <div>
              {ruleStats.errorMessage && <Alert type={'error'} message={ruleStats.errorMessage} />}
              {ruleStats.isFetching ? (
                <Spin size="small" className={'global-spin'} />
              ) : (
                <div>
                  <Row>
                    <Col sm={8} xs={24}>
                      <Info title={'Validation Rate'} value={validationPercentage} bordered />
                    </Col>
                    <Col sm={8} xs={24}>
                      <Info title={'Rules Added This Week'} value={String(ruleStats.lastWeek)} bordered />
                    </Col>
                    <Col sm={8} xs={24}>
                      <Info title={'Total Rules'} value={String(ruleStats.total)} />
                    </Col>
                  </Row>
                  <Tabs activeKey={activeKey} onChange={this.handleTabChange}>
                    {ruleStats.categories.map(category => (
                      <Tabs.TabPane
                        tab={<DetailsTab data={category} isSelected={activeKey === category.name} />}
                        key={category.name}
                      />
                    ))}
                  </Tabs>
                </div>
              )}
            </div>
          </Card>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: getAuthDetails(state),
    organization: getOrganization(state),
    ruleStats: getRuleStats(state),
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      getOrganizationIfNeeded,
      loadRulesIfNeeded,
    },
    dispatch,
  );
};

Analysis = connect(mapStateToProps, mapDispatchToProps)(Analysis);
export default Analysis;
