import React, { Component } from "react";
import { TouchableOpacity } from "react-native";
import styles from "./styles";

export class Button extends Component {
  render() {
    let opacity = this.props.disabled ? 1 : 0.5;
    return (
      <TouchableOpacity
        activeOpacity={opacity}
        onPress={this.props.onPress}
        style={[styles.wideButton, this.props.style]}
      >
        {this.props.children}
      </TouchableOpacity>
    );
  }
}

Button.defaultProps = { disabled: false };

export default Button;
