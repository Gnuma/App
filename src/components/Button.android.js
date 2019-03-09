import React, { Component } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  TouchableNativeFeedback
} from "react-native";

export class Button extends Component {
  render() {
    if (this.props.disabled) {
      return (
        <View pointerEvents="box-only" style={this.props.style}>
          {this.props.children}
        </View>
      );
    } else {
      return (
        <TouchableNativeFeedback
          onPress={this.props.onPress}
          background={TouchableNativeFeedback.Ripple()}
          useForeground={true}
        >
          <View pointerEvents="box-only" style={this.props.style}>
            {this.props.children}
          </View>
        </TouchableNativeFeedback>
      );
    }
  }
}

Button.defaultProps = { disabled: false };

export default Button;
