import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import {Provider} from 'react-redux';
import {store} from './store';
import {ValhallaApp} from './App';
import {LocaleProvider} from 'antd';
import enUS from 'antd/lib/locale-provider/en_US';
import {RouterConfig} from './router';

let render = () =>
  ReactDOM.render(
    <Provider store={store}>
      <LocaleProvider locale={enUS}>
        <RouterConfig />
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
