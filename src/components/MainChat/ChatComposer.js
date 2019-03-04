import React, { Component } from "react";
import { Text, View, TextInput } from "react-native";

export default class ChatComposer extends Component {
  render() {
    const { onSend } = this.props;
    return (
      <View
        style={{
          backgroundColor: "white",
          paddingHorizontal: 8,
          paddingVertical: 3,
          elevation: 4,
          flexDirection: "row",
          flex: 1
        }}
      >
        <TextInput style={{ flex: 1 }} placeholder={"Scrivi un messaggio"} />
      </View>
    );
  }

  onSend = () => {};
}
