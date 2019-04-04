import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";
import Button from "./Button";
import Icon from "react-native-vector-icons/FontAwesome";

export default ({ children, style, icon, iconSize, iconStyle, ...rest }) => {
  return (
    <Button style={[styles.container, style]} {...rest}>
      <View style={styles.children}>{children}</View>
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
    borderRadius: 8,
    marginVertical: 4
  },
  icon: {
    alignSelf: "center",
    paddingLeft: 10
  },
  children: {
    flex: 1
  }
});
