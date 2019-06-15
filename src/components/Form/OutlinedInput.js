import React, { Component } from "react";
import { View, TextInput, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import Button from "../Button";
import Icon from "react-native-vector-icons/FontAwesome";
import colors from "../../styles/colors";

export default class OutlinedInput extends Component {
  static propTypes = {
    onTextChange: PropTypes.func,
    value: PropTypes.string,
    icon: PropTypes.string,
    placeholder: PropTypes.string,
    inputType: PropTypes.string,
    inputStyle: PropTypes.any,
    containerStyle: PropTypes.any,
    borderFocus: PropTypes.bool
  };

  _onChange = text => {
    this.props.onTextChange(text);
  };

  _focusInput = () => {
    this.input.focus();
  };

  _setInputRef = input => {
    this.input = input;
  };

  render() {
    const {
      style,
      value,
      placeholder,
      icon,
      inputType,
      inputStyle,
      containerStyle,
      borderFocus,
      ...rest
    } = this.props;
    return (
      <View
        style={[
          {
            margin: 8,
            flexDirection: "row"
          },
          containerStyle
        ]}
      >
        <View style={{ flex: 1, elevation: 0, flexDirection: "row" }}>
          <TextInput
            style={[
              {
                flex: 1,
                fontSize: 18,
                padding: 8,
                elevation: 4,
                backgroundColor: "white",
                justifyContent: "center",
                borderBottomLeftRadius: 6,
                borderTopLeftRadius: 6
              },
              inputStyle
            ]}
            placeholder={placeholder}
            onChangeText={this._onChange}
            value={value}
            ref={this._setInputRef}
            keyboardType={inputType}
            {...rest}
          />
          <Button
            style={{
              width: 50,
              backgroundColor: "white",
              elevation: 5,
              borderTopRightRadius: 6,
              borderBottomRightRadius: 6,
              justifyContent: "center",
              alignItems: "center"
            }}
            onPress={this._focusInput}
          >
            <Icon name={icon} size={22} />
          </Button>
        </View>
      </View>
    );
  }
}

OutlinedInput.defaultProps = {
  icon: "edit"
};
