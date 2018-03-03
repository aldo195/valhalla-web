// @flow
import React from 'react';
import {Input, Icon, AutoComplete} from 'antd';
import classNames from 'classnames';
import './HeaderSearch.css';

type Props = {
  className: string,
  placeholder: string,
  onPressEnter: string => void,
  onChange: () => void,
};

type State = {
  searchMode: boolean,
  value: string,
};

export default class HeaderSearch extends React.PureComponent<Props, State> {
  state = {
    searchMode: false,
    value: '',
  };

  input: ?Input;
  timeout: ?TimeoutID;

  componentWillUnmount() {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
  }

  onKeyDown = (e: SyntheticKeyboardEvent<Input>) => {
    if (e.key === 'Enter') {
      this.timeout = setTimeout(() => {
        // Fix duplicate onPressEnter.
        this.props.onPressEnter(this.state.value);
      }, 0);
    }
  };

  onChange = (value: string) => {
    this.setState({value});
    if (this.props.onChange) {
      this.props.onChange();
    }
  };

  enterSearchMode = () => {
    this.setState({searchMode: true}, () => {
      if (this.state.searchMode && this.input) {
        this.input.focus();
      }
    });
  };

  leaveSearchMode = () => {
    this.setState({
      searchMode: false,
      value: '',
    });
  };

  render() {
    const {className, placeholder, ...restProps} = this.props;
    const inputClass = classNames('input', {
      show: this.state.searchMode,
    });
    return (
      <span className={classNames('headerSearch', className)} onClick={this.enterSearchMode}>
        <Icon type="search" key="Icon" />
        <AutoComplete
          key="AutoComplete"
          {...restProps}
          className={inputClass}
          value={this.state.value}
          onChange={this.onChange}
        >
          <Input
            placeholder={placeholder}
            ref={node => {
              this.input = node;
            }}
            onKeyDown={this.onKeyDown}
            onBlur={this.leaveSearchMode}
          />
        </AutoComplete>
      </span>
    );
  }
}
