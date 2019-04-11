import React, { Component } from "react";
import { Text, View } from "react-native";
import Button from "../Button";
import Icon from "react-native-vector-icons/FontAwesome";
import { Header2, Header5 } from "../Text";
import colors from "../../styles/colors";

export default class HomeHeader extends Component {
  render() {
    return (
      <View
        style={{
          height: 60,
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: "white",
          elevation: 6
        }}
      >
        <Button onPress={this.props.handleGoBack} style={{ padding: 10 }}>
          <Icon name="chevron-left" size={24} style={{ color: colors.black }} />
        </Button>
        <View>
          <Header2 color={"primary"}>Chat</Header2>
        </View>
      </View>
    );
  }
}
