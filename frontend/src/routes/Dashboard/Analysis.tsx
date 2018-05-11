import {Alert, Card, Row, Spin, Tabs} from 'antd';
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators, Dispatch} from 'redux';
import {getOrganizationIfNeeded} from '../../actions/organization';
import {loadRulesIfNeeded} from '../../actions/rules';
import {DetailsTab} from '../../components/Dashboard';
import Exception from '../../components/Exception/Exception';
import * as exceptionTypes from '../../constants/exceptionTypes';
import '../../index.css';
import {getAuthDetails} from '../../reducers/auth';
import {getOrganization} from '../../reducers/organization';
import {getRuleStats} from '../../reducers/rules';
import * as stateTypes from '../../reducers/types';
import './Analysis.css';

interface StateProps {
  auth: stateTypes.AuthDetails;
  organization: stateTypes.OrganizationState;
  ruleStats: stateTypes.RuleStats;
}

interface DispatchProps {
  getOrganizationIfNeeded: typeof getOrganizationIfNeeded;
  loadRulesIfNeeded: typeof loadRulesIfNeeded;
}

interface State {
  currentTabKey: string;
}

type AnalysisProps = StateProps & DispatchProps;

class Analysis extends React.PureComponent<AnalysisProps, State> {
  state = {
    currentTabKey: '',
  };

  fetchData() {
    const {auth} = this.props;
    if (auth.organizationId && auth.token) {
      this.props.getOrganizationIfNeeded(auth.organizationId, auth.token);
      this.props.loadRulesIfNeeded(auth.token);
    }
  }

  componentDidMount() {
    this.fetchData();
  }

  handleTabChange = (key: string) => {
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

    const organizationTitle = (organization.details && organization.details.title) || '???';

    return (
      <div>
        {organization.isFetching ? (
          <Spin size="large" className={'global-spin'} />
        ) : (
          <Card title={`${organizationTitle} Security Policy`} className={'card'} bordered={true}>
            <div>
              {ruleStats.errorMessage && <Alert type={'error'} message={ruleStats.errorMessage} />}
              {ruleStats.isFetching ? (
                <Spin size="small" className={'global-spin'} />
              ) : (
                <div>
                  <Row>
                    <h1>Hello!</h1>
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

const mapStateToProps = (state: stateTypes.State) => {
  return {
    auth: getAuthDetails(state),
    organization: getOrganization(state),
    ruleStats: getRuleStats(state),
  };
};

const mapDispatchToProps = (dispatch: Dispatch<stateTypes.State>) => {
  return bindActionCreators(
    {
      getOrganizationIfNeeded,
      loadRulesIfNeeded,
    },
    dispatch,
  );
};

const ConnectedAnalysis = connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps)(Analysis);
export default ConnectedAnalysis;
