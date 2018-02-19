import './Analysis.css';
import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Col, Row, Card, Tabs} from 'antd';
import {withRouter} from 'react-router-dom';
import {getAuthDetails} from '../../reducers/auth';
import {DetailsTab} from '../../components/Dashboard/DetailsTab';

const offlineData = [];
offlineData.push({
  name: 'IDENTIFY',
  passing: 2,
  failing: 0,
  pending: 1,
  cvr: 0,
});
offlineData.push({
  name: 'PROTECT',
  passing: 4,
  failing: 1,
  pending: 5,
  cvr: 0,
});
offlineData.push({
  name: 'DETECT',
  passing: 2,
  failing: 2,
  pending: 1,
  cvr: 0,
});
offlineData.push({
  name: 'RESPOND',
  passing: 0,
  failing: 0,
  pending: 0,
  cvr: 0,
});
offlineData.push({
  name: 'RECOVER',
  passing: 0,
  failing: 0,
  pending: 0,
  cvr: 0,
});

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTabKey: '',
    };
  }

  fetchData() {}

  componentDidMount() {
    this.fetchData();
  }

  handleTabChange = key => {
    this.setState({
      currentTabKey: key,
    });
  };

  render() {
    const activeKey = this.state.currentTabKey || (offlineData[0] && offlineData[0].name);

    const Info = ({title, value, bordered}) => (
      <div className={'headerInfo'}>
        <span>{title}</span>
        <p>{value}</p>
        {bordered && <em />}
      </div>
    );

    return (
      <div>
        <Card title="Sigma Security Policy" className={'card'} bordered={true}>
          <Row>
            <Col sm={8} xs={24}>
              <Info title="Validation Rate" value="44%" bordered />
            </Col>
            <Col sm={8} xs={24}>
              <Info title="Rules Added This Week" value="7" bordered />
            </Col>
            <Col sm={8} xs={24}>
              <Info title="Total Rules" value="18" />
            </Col>
          </Row>
          <Tabs activeKey={activeKey} onChange={this.handleTabChange}>
            {offlineData.map(shop => (
              <Tabs.TabPane
                tab={<DetailsTab data={shop} isSelected={this.state.currentTabKey === shop.name} />}
                key={shop.name}
              />
            ))}
          </Tabs>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ...getAuthDetails(state),
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({}, dispatch);
};

Home = withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));
export {Home};
