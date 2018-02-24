import React from 'react';
import '../index.css';
import {Spin} from 'antd';

let defaultLoadingComponent = () => {
  return <Spin size="large" className={'globalSpin'} />;
};

export default function loadDynamicComponent(config) {
  const {component: resolveComponent} = config;

  return class DynamicComponent extends React.PureComponent {
    constructor(props) {
      super(props);
      this.LoadingComponent = config.LoadingComponent || defaultLoadingComponent;
      this.state = {
        Component: null,
      };
    }

    componentDidMount() {
      this.mounted = true;
    }

    componentWillUnmount() {
      this.mounted = false;
    }

    componentWillMount() {
      resolveComponent().then(Component => {
        if (this.mounted) {
          this.setState({Component});
        }
      });
    }

    render() {
      const {Component} = this.state;
      const {LoadingComponent} = this;
      if (Component) return <Component {...this.props} />;

      return <LoadingComponent {...this.props} />;
    }
  };
}
