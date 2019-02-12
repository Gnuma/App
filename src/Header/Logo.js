import React, { Component } from "react";
import { Text, View } from "react-native";
import { Image } from "react-native";
import styles from "./styles";

export default class Logo extends Component {
  render() {
    return (
      <View style={styles.logoView}>
        <Image source={require("../media/imgs/logo.png")} style={styles.logo} />
        <Text style={styles.logoText}>Gnuma</Text>
      </View>
    );
  }
}
