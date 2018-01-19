import React from 'react';
import "./Main.css"
import { Home } from "./Home";
import { Route, Switch, withRouter } from 'react-router-dom';
import * as routes from "../constants/routes";

class Main extends React.Component {
  render() {
    return (
      <div>
        <Switch location={this.props.location}>
          <Route exact path={routes.HOME} component={Home}/>
        </Switch>
      </div>
    );
  }
}

Main = withRouter(Main);

export {Main};
