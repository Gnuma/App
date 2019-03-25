import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";
import Button from "./Button";
import Icon from "react-native-vector-icons/FontAwesome";

export default ({ children, style, icon, iconSize, iconStyle, ...rest }) => {
  return (
    <Button style={[styles.container, style]} {...rest}>
      {children}
      {icon ? (
        <Icon name={icon} size={iconSize} style={[styles.icon, iconStyle]} />
      ) : null}
    </Button>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    elevation: 2,
    flexDirection: "row",
    padding: 10,
    justifyContent: "center",
    borderRadius: 8,
    marginVertical: 4
  },
  icon: {
    position: "absolute",
    right: 10,
    alignSelf: "center"
  }
});