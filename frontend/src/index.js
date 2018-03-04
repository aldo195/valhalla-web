import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import {Provider} from 'react-redux';
import {store} from './store';
import {LocaleProvider} from 'antd';
import enUS from 'antd/lib/locale-provider/en_US';
import {ValhallaApp} from './App';

let render = () =>
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
  if (module.hot) {
    module.hot.accept('./App', () => {
      render();
    });
  }
}
