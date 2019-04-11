import React, { Component } from "react";
import { Text, View } from "react-native";
import { Header3, Header4 } from "../../Text";
import styles from "./styles";

export default props => {
  const { text, sender, fromUser, fromSameUser } = props;
  return (
    <View
      style={[
        styles.generalBubble,
        fromUser ? styles.fromBubble : styles.toBubble,
        { marginTop: fromSameUser ? 0 : 12 }
      ]}
    >
      <Header3 color={fromUser ? "white" : "black"}>{text}</Header3>
    </View>
  );
};
