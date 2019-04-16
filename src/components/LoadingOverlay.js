import React, { Component } from "react";
import { Text, View, StyleSheet, TouchableWithoutFeedback } from "react-native";
import Button from "./Button";
import Icon from "react-native-vector-icons/FontAwesome";

export default ({ active, children, ...rest }) => {
  return (
    <View {...rest}>
      {children}
      {active ? (
        <TouchableWithoutFeedback>
          <View
            style={[
              StyleSheet.absoluteFill,
              { backgroundColor: "rgba(196, 196, 196, 0.2)", zIndex: 100 }
            ]}
          />
        </TouchableWithoutFeedback>
      ) : null}
    </View>
  );
};
