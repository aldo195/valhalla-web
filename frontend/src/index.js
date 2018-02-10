import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import {Provider} from 'react-redux';
import {store} from './store';
import {ValhallaApp} from './App';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import * as routes from './constants/routes';
import {Login} from './components/Login/Login';
import {Register} from './components/Register/Register';
import {LocaleProvider} from 'antd';
import enUS from 'antd/lib/locale-provider/en_US';
import {requireAuthentication} from './components/AuthenticatedComponent';
import {ErrorPage} from './components/Exception';

let render = () =>
  ReactDOM.render(
    <Provider store={store}>
      <LocaleProvider locale={enUS}>
        <BrowserRouter basename={routes.HOME}>
          <Switch>
            <Route path={routes.LOGIN} component={Login} />
            <Route path={routes.REGISTER} component={Register} />
            <Route exact path={routes.HOME} component={requireAuthentication(ValhallaApp)} />
            {/*Single rule for all inner routes*/}
            {[].map(path => <Route key={path} path={path} component={requireAuthentication(ValhallaApp)} />)}
            {/*Default rule*/}
            <Route component={ErrorPage(404)} />
          </Switch>
        </BrowserRouter>
      </LocaleProvider>
    </Provider>,
    document.getElementById('root'),
  );

// We first render the application
render();
registerServiceWorker();

if (process.env.NODE_ENV !== 'production') {
  // If webpacks HMR detects a change in the App, we reload it
  if (module.hot) {
    module.hot.accept('./App', () => {
      render(ValhallaApp);
    });
  }
}
