import React, { Component } from "react";
import { Text, View } from "react-native";
import Button from "../../components/Button";
import { Header1 } from "../../components/Text";

export default class ModalTest extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Button onPress={() => this.props.navigation.goBack(null)}>
          <Header1>DISMISS</Header1>
        </Button>
      </View>
    );
  }
}
