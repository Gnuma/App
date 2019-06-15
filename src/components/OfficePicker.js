import React, { Component } from "react";
import { Text, StyleSheet, View } from "react-native";
import Picker from "./TextInputPicker";

export default class OfficePicker extends Component {
  render() {
    const { options, onSelect, onTextChange, value } = this.props;

    return (
      <View>
        <Picker defaultValue={"Istituto"} options={this.state.options} />
      </View>
    );
  }
}

const styles = StyleSheet.create({});
