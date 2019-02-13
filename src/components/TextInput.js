import React, { Component } from "react";
import PropTypes from "prop-types";
import { TextInput as RTI } from "react-native";

export class TextInput extends Component {
  static propTypes = {
    focus: PropTypes.bool
  };

  static defaultProps = {
    focus: false
  };

  // Methods:
  focus() {
    this._component.focus();
  }

  componentWillReceiveProps(nextProps) {
    const { focus } = nextProps;
    focus && this.focus();
  }

  render() {
    return (
      <RTI {...this.props} focus={true} ref={ref => (this._component = ref)} />
    );
  }
}

export default TextInput;
