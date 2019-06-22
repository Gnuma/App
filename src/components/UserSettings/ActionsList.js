import React, { Component } from "react";
import { Text, View } from "react-native";
import { Header3 } from "../Text";
import SolidButton from "../SolidButton";
import Card from "../Card";
import styles from "./styles";

export default class ActionsList extends Component {
  render() {
    const { logout, } = this.props;

    return (
      <View
        style={{
          marginHorizontal: 20,
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <SolidButton style={styles.actionButton}>
          <Header3 color="black" style={styles.actionText}>
            Invita un amico
          </Header3>
        </SolidButton>
        <SolidButton style={styles.actionButton} onPress={logout}>
          <Header3 color="black" style={styles.actionText}>
            Logout
          </Header3>
        </SolidButton>
      </View>
    );
  }
}
