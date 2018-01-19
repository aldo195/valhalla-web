import React from 'react';
import './App.css';
import {Header as ValhallaHeader} from "./components/Header/Header";
import {Main as ValhallaContent} from "./containers/Main";
import {Layout} from "antd";
import {withRouter} from "react-router-dom";

const {Header, Content} = Layout;

class ValhallaApp extends React.Component {
  render() {
    return (
      <Layout className="layout">
        <Header id="valhalla-main-nav">
          <ValhallaHeader />
        </Header>
        <Content>
          <ValhallaContent />
        </Content>
      </Layout>
    )
  }
}

ValhallaApp = withRouter(ValhallaApp);

export {ValhallaApp};
