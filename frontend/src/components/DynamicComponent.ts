import React from 'react';
import '../index.css';
import {Spin} from 'antd';

let defaultLoadingComponent = () => {
  return <Spin size="large" className={'global-spin'} />;
};

type ConfigType = {
  component: () => void;
  LoadingComponent: () => any;
};

type Props = {};

type State = {
  Component: null | (() => null);
};

export default function loadDynamicComponent(config: ConfigType) {
  const {component: resolveComponent} = config;
  const LoadingComponent = config.LoadingComponent || defaultLoadingComponent;

  return class DynamicComponent extends React.PureComponent<Props, State> {
    state = {
      Component: null,
    };

    mounted: boolean;

    componentDidMount() {
      this.mounted = true;
    }

    componentWillUnmount() {
      this.mounted = false;
    }

    async componentWillMount() {
      const Component = await resolveComponent();
      if (this.mounted) {
        this.setState({Component});
      }
    }

    render() {
      const {Component} = this.state;
      if (Component) return <Component {...this.props} />;

      return <LoadingComponent {...this.props} />;
    }
  };
}
