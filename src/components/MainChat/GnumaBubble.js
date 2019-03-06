import React, { Component } from "react";
import { Text, View } from "react-native";
import { Header3, Header4 } from "../Text";

export default props => {
  const { text, sender, fromUser  } = props;
  console.log(fromUser)
  return (
    <View style={{ backgroundColor: fromUser ? "lightblue" : "red" , height: 30 }}>
      <Header3>{text}</Header3>
    </View>
  );
};
