import React, { Component } from "react";
import { View, TextInput } from "react-native";
import PropTypes from "prop-types";
import Button from "../Button";
import Icon from "react-native-vector-icons/FontAwesome";

export default class OutlinedInput extends Component {
  static propTypes = {
    onTextChange: PropTypes.func,
    value: PropTypes.string,
    icon: PropTypes.string,
    placeholder: PropTypes.string,
    inputType: PropTypes.string
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
    const { style, value, placeholder, icon, inputType } = this.props;
    return (
      <View style={[{ padding: 8, flexDirection: "row" }, style]}>
        <TextInput
          style={{
            flex: 1,
            fontSize: 18,
            padding: 8,
            elevation: 4,
            backgroundColor: "white",
            justifyContent: "center",
            borderBottomLeftRadius: 6,
            borderTopLeftRadius: 6
          }}
          placeholder={placeholder}
          onChangeText={this._onChange}
          value={value}
          ref={this._setInputRef}
          keyboardType={inputType}
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
    );
  }
}

OutlinedInput.defaultProps = {
  icon: "edit"
};
