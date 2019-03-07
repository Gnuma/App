import React, { Component } from "react";
import { View } from "react-native";
import { Header3 } from "../Text";
import Button from "../Button";
import Icon from "react-native-vector-icons/FontAwesome";
import colors from "../../styles/colors";

export default props => {
  return (
    <Button
      style={{
        minWidth: 320,
        padding: 8,
        elevation: 4,
        backgroundColor: "white",
        borderRadius: 6,
        justifyContent: "center"
      }}
      onPress={props.onPress}
    >
      <Header3 style={{ color: "rgba(32, 32, 32, 0.6)" }}>
        Cerca un libro o una materia
      </Header3>
      <Icon
        name="search"
        size={20}
        style={{ position: "absolute", right: 10, alignSelf: "center" }}
      />
    </Button>
  );
};
