import React, { Component } from "react";
import { View } from "react-native";
import styles from "./styles";
import { Header1 } from "../components/Text";

export default class Logo extends Component {
  render() {
    return (
      <Header1 color="white" style={styles.logo}>
        Quipu
      </Header1>
    );
  }
}
