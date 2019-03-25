import React, { Component } from "react";
import { Text, View } from "react-native";
import ProgressCircle from "react-native-progress-circle";
import colors from "../styles/colors";
import { Header5 } from "./Text";

const conditionsTable = {
  0: {
    text: "Ottimo",
    percentage: 75,
    color: colors.secondary
  },
  1: {
    text: "Buono",
    percentage: 50,
    color: colors.lightYellow
  },
  2: {
    text: "Usurato",
    percentage: 25,
    color: colors.red
  },
  3: {
    text: "ERROR",
    percentage: 25,
    color: colors.red
  }
};

const getConditions = id => {
  switch (id) {
    case 0:
      return conditionsTable[0];
    case 1:
      return conditionsTable[1];
    case 2:
      return conditionsTable[2];
    default:
      return conditionsTable[3];
  }
};

export default function ConditionCircle(props) {
  const { conditions, style, radius, fontSize } = props;
  const { text, percentage, color } = getConditions(conditions);
  const calculatedFontSize = fontSize ? fontSize : radius * fontRatio;
  return (
    <ProgressCircle
      percent={percentage}
      radius={radius}
      borderWidth={5}
      color={color}
      shadowColor="#C4C4C4"
      bgColor="#fff"
      outerCircleStyle={{ elevation: 2 }}
      style={style}
    >
      <Header5 color={"primary"} style={{ fontSize: calculatedFontSize }}>
        {text}
      </Header5>
    </ProgressCircle>
  );
}

const fontRatio = 0.4;
