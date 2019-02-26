import React, { Component } from "react";
import { Text, View, Image } from "react-native";
import Button from "../Button";
import colors from "../../styles/colors";
import { Header3, Header4 } from "../Text";

const imageHeight = 90;

export default class ChatLink extends Component {
  render() {
    return (
      <Button style={{ marginHorizontal: 15, flexDirecton: "row", flex: 1 }}>
        <Image
          style={{
            height: imageHeight,
            width: 83,
            borderRadius: 4
          }}
          source={require("../../media/imgs/thumbnail-test.png")}
        />
        <View style={{ flex: 1 }}>
          <Header3 color={"primary"}>Federico 8</Header3>
          <View style={{ flexDirection: "row" }}>
            <Header4>Matematica Verde 3</Header4>
            <Header4 style={{ flex: 1, alignSelf: "flex-end" }}>EUR 15</Header4>
          </View>
          <Header4>Si è il mio ragazzio che coincidenza</Header4>
        </View>
      </Button>
    );
  }
}
