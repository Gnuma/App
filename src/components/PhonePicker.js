import React, { Component } from "react";
import { Text, StyleSheet, View } from "react-native";
import PropTypes from "prop-types";
import { StatusBar } from "./StatusBar";
import OutlinedInput from "./Form/OutlinedInput";
import { Header3, Header2 } from "./Text";
import CodeInput from "./Form/CodeInput";

export default class PhonePicker extends Component {
  static propTypes = {
    phone: PropTypes.any,
    code: PropTypes.any,
    status: PropTypes.any,

    changePhoneText: PropTypes.func,
    changeCodeValue: PropTypes.func
  };

  changePhoneText = value => {
    this.props.changePhoneText && this.props.changePhoneText(value);
  };

  getContent = () => {
    const { phone, status, ...rest } = this.props;
    if (status == 0) {
      return (
        <View
          style={{
            flex: 1,
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
            inputStyle={{ flex: 1 }}
            {...rest}
          />
        </View>
      );
    } else {
      return (
        <View>
          <Header3 color="black">
            Inserisci il codice di attivazione inviato al numero{" "}
            <Header3 color="primary">+39 {phone}</Header3>
          </Header3>
          <CodeInput
            code={this.props.code}
            onTextChange={this.props.changeCodeValue}
          />
        </View>
      );
    }
  };

  render() {
    const { status, disableStatusBar } = this.props;
    return (
      <View style={disableStatusBar && { flexDirection: "row" }}>
        {!disableStatusBar && (
          <StatusBar
            status={status}
            data={["Numero di telefono", "Codice di attivazione"]}
          />
        )}
        {this.getContent()}
      </View>
    );
  }
}

const styles = StyleSheet.create({});

const mask = [3, 6, 8];
