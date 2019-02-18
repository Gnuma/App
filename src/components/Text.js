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

export function Header2({ children, style, ...rest }) {
  return (
    <RText style={[styles.h2, style]} {...rest}>
      {children}
    </RText>
  );
}

export function Header3({ children, style, ...rest }) {
  return (
    <RText style={[styles.h3, style]} {...rest}>
      {children}
    </RText>
  );
}

export function Header4({ children, style, ...rest }) {
  return (
    <RText style={[styles.h4, style]} {...rest}>
      {children}
    </RText>
  );
}

export function Header5({ children, style, ...rest }) {
  return (
    <RText style={[styles.h5, style]} {...rest}>
      {children}
    </RText>
  );
}

const styles = StyleSheet.create({
  h1: {
    fontSize: 27
  },
  h2: {
    fontSize: 22
  },
  h3: {
    fontSize: 18
  },
  h4: {
    fontSize: 14
  },
  h5: {
    fontSize: 11
  }
});
