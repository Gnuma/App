import React from "react";
import { Text as RText } from "react-native";
import { StyleSheet } from "react-native";
import colors from "../styles/colors";

export function Header1({ children, style, color, ...rest }) {
  return (
    <RText style={[styles.h1, { color: colors[color] }, style]} {...rest}>
      {children}
    </RText>
  );
}

export function Header2({ children, style, color, ...rest }) {
  return (
    <RText style={[styles.h2, { color: colors[color] }, style]} {...rest}>
      {children}
    </RText>
  );
}

export function Header3({ children, style, color, ...rest }) {
  return (
    <RText style={[styles.h3, { color: colors[color] }, style]} {...rest}>
      {children}
    </RText>
  );
}

export function Header4({ children, style, color, ...rest }) {
  return (
    <RText style={[styles.h4, { color: colors[color] }, style]} {...rest}>
      {children}
    </RText>
  );
}

export function Header5({ children, style, color, ...rest }) {
  return (
    <RText style={[styles.h5, { color: colors[color] }, style]} {...rest}>
      {children}
    </RText>
  );
}

const styles = StyleSheet.create({
  h1: {
    fontSize: 27,
    lineHeight: 27
  },
  h2: {
    fontSize: 22,
    lineHeight: 22
  },
  h3: {
    fontSize: 18,
    lineHeight: 18
  },
  h4: {
    fontSize: 14,
    lineHeight: 14
  },
  h5: {
    fontSize: 11,
    lineHeight: 11
  }
});
