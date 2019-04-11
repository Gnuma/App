import React, { Component } from "react";
import { Text, View, Image } from "react-native";
import Button from "../Button";
import colors from "../../styles/colors";
import { Header3, Header2, Header4 } from "../Text";

const imageHeight = 90;

export default class ChatLink extends Component {
  render() {
    const { price, seller, book, to, status } = this.props.data;
    return (
      <Button
        style={{ flex: 1, flexDirection: "row", padding: 20 }}
        onPress={this._local_inspectChat}
      >
        <Image
          style={{
            height: imageHeight,
            width: 83,
            borderRadius: 4
          }}
          source={require("../../media/imgs/thumbnail-test.png")}
        />
        <View
          style={{
            flex: 1,
            marginLeft: 10,
            marginBottom: 15
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <Header2 color={"primary"}>{to.name} 8</Header2>
            <Header2 style={{ flex: 1, textAlign: "right" }} color={"primary"}>
              EUR {"price"}
            </Header2>
          </View>
          <Header3 color={"black"}>{"book.title"}</Header3>
          <View
            style={{
              flex: 1,
              flexDirection: "row"
            }}
          >
            <Header4 style={{ flex: 4 }} numberOfLines={1}>
              Si è il mio ragazzio che coincidenza
            </Header4>
            <Header4 style={{ flex: 1, textAlign: "right" }} numberOfLines={1}>
              19:14
            </Header4>
          </View>
        </View>
      </Button>
    );
  }

  _local_inspectChat = () => {
    this.props.inspectChat(this.props.data);
  };
}
