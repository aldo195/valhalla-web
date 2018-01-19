import './Home.css';
import React from 'react';
import { bindActionCreators } from 'redux';
import {connect} from "react-redux";
import {Col, Row} from "antd";
import {withRouter} from "react-router-dom";
import {getAuthDetails} from "../reducers/auth";

class Home extends React.Component {
  fetchData() {
  }

  componentDidMount() {
    this.fetchData()
  }

  componentDidUpdate() {
    this.fetchData()
  }

  render() {
    return (
      <div id={"home-page"}>
        <Col>
          <Row>

          </Row>
        </Col>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ...getAuthDetails(state)
  }
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
  }, dispatch);
};

Home = withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));
export {Home};
