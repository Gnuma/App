import React, { Component } from "react";
import { Text, StyleSheet, View } from "react-native";
import PropTypes from "prop-types";
import { StatusBar } from "./StatusBar";
import OutlinedInput from "./Form/OutlinedInput";
import { Header3 } from "./Text";
import CodeInput from "./Form/CodeInput";

export default class PhonePicker extends Component {
  static propTypes = {
    phone: PropTypes.string,
    code: PropTypes.array,
    status: PropTypes.number,

    changePhoneText: PropTypes.func,
    changeCodeValue: PropTypes.func
  };

  changePhoneText = value => {
    /*let subtracting = value < this.props.phone;
    value = value.replace(/\s/g, "");
    let spaces = 0;
    for (let i = 0; i < mask.length; i++) {
      let pointer = mask[i] + spaces;
      if (
        value.length >= pointer &&
        (!subtracting || value.length !== pointer)
      ) {
        value = value.substring(0, pointer) + " " + value.substring(pointer);
        spaces++;
      } else {
        break;
      }
    }*/
    this.props.changePhoneText && this.props.changePhoneText(value);
  };

  getContent = () => {
    const { phone, status } = this.props;
    if (status == 0) {
      return (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Header3 color="black">+39</Header3>
          <OutlinedInput
            value={phone}
            placeholder="Numero di telefono"
            onTextChange={this.changePhoneText}
            inputType="phone-pad"
            containerStyle={{ flex: 1 }}
            isPhone
          />
        </View>
      );
    } else {
      return (
        <View>
          <CodeInput
            code={this.props.code}
            onTextChange={this.props.changeCodeValue}
          />
        </View>
      );
    }
  };

  render() {
    const { status } = this.props;
    return (
      <View>
        <StatusBar
          status={status}
          data={["Numero di telefono", "Codice di attivazione"]}
        />
        {this.getContent()}
      </View>
    );
  }
}

const styles = StyleSheet.create({});

const mask = [3, 6, 8];
