import {LocaleProvider} from 'antd';
import enUS from 'antd/lib/locale-provider/en_US';
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import {store} from './store';

import {ValhallaApp} from 'App.tsx';

const render = () =>
  ReactDOM.render(
    <Provider store={store}>
      <LocaleProvider locale={enUS}>
        <ValhallaApp />
      </LocaleProvider>
    </Provider>,
    document.getElementById('root'),
  );

// We first render the application
render();
registerServiceWorker();

if (process.env.NODE_ENV !== 'production') {
  // If webpack's HMR detects a change in the App, we reload it
  const moduleAsAny = module as any;
  if (moduleAsAny.hot) {
    moduleAsAny.hot.accept('./App', () => {
      render();
    });
  }
}