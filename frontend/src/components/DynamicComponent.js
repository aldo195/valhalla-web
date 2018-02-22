import React from 'react';
import '../index.css';
import {Spin} from 'antd';

let defaultLoadingComponent = () => {
  return <Spin size="large" className={'globalSpin'} />;
};

function loadDynamicComponent(config) {
  const {component: resolveComponent} = config;

  return class DynamicComponent extends React.Component {
    constructor(...args) {
      super(...args);
      this.LoadingComponent = config.LoadingComponent || defaultLoadingComponent;
      this.state = {
        AsyncComponent: null,
      };
      this.load();
    }

    componentDidMount() {
      this.mounted = true;
    }

    componentWillUnmount() {
      this.mounted = false;
    }

    load() {
      resolveComponent().then(m => {
        const AsyncComponent = m.default || m;
        if (this.mounted) {
          this.setState({AsyncComponent});
        } else {
          this.state.AsyncComponent = AsyncComponent; // eslint-disable-line
        }
      });
    }

    render() {
      const {AsyncComponent} = this.state;
      const {LoadingComponent} = this;
      if (AsyncComponent) return <AsyncComponent {...this.props} />;

      return <LoadingComponent {...this.props} />;
    }
  };
}

export {loadDynamicComponent};
