import React, { Component } from "react";
import { Text, StyleSheet, View } from "react-native";
import PropTypes from "prop-types";
import { StatusBar } from "./StatusBar";

export default class PhonePicker extends Component {
  static propTypes = {
    phone: PropTypes.string,
    status: PropTypes
  };

  render() {
    return <View />;
  }
}

const styles = StyleSheet.create({});
