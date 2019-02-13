import React, { Component } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

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

const styles = StyleSheet.create({
  wideButton: {
    justifyContent: "center",
    alignItems: "center"
  }
});

Button.defaultProps = { disabled: false };

export default Button;
