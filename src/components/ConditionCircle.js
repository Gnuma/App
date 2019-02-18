import React, { Component } from "react";
import { Text, View } from "react-native";
import ProgressCircle from "react-native-progress-circle";
import colors from "../styles/colors";
import { Header5 } from "./Text";

const conditionsTable = {
  1: {
    text: "Ottimo",
    percentage: 75,
    color: colors.secondary
  },
  2: {
    text: "Buono",
    percentage: 50,
    color: colors.lightYellow
  },
  3: {
    text: "Usurato",
    percentage: 25,
    color: colors.red
  }
};

export default function ConditionCircle(props) {
  const { text, percentage, color } = conditionsTable[props.conditions];
  return (
    <ProgressCircle
      percent={percentage}
      radius={35}
      borderWidth={5}
      color={color}
      shadowColor="#C4C4C4"
      bgColor="#fff"
      outerCircleStyle={{ elevation: 2 }}
      style={{ margin: 10 }}
    >
      <Header5 style={{ color: colors.primary }}>{text}</Header5>
    </ProgressCircle>
  );
}
