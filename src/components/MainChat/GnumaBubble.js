import React, { Component } from "react";
import { Text, View } from "react-native";
import { Header3, Header4 } from "../Text";

export default (GnumaBubble = props => {
  const { text } = props;
  return (
    <View style={{ backgroundColor: "lightblue", height: 30 }}>
      <Header3>{text}</Header3>
    </View>
  );
});
