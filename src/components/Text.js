import React from "react";
import { Text as RText } from "react-native";
import { StyleSheet } from "react-native";

export function Header1({ children, style, ...rest }) {
  return (
    <RText style={[styles.h1, style]} {...rest}>
      {children}
    </RText>
  );
}

const styles = StyleSheet.create({
  h1: {
    fontSize: 18
  }
});
