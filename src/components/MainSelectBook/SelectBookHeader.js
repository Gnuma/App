import React, { Component } from "react";
import { View, TextInput } from "react-native";
import Button from "../Button";
import Icon from "react-native-vector-icons/FontAwesome";
import { Header2, Header5 } from "../Text";

export default class SelectBookHeader extends Component {
  render() {
    const { onChangeText, searchQuery, resetSearchBar } = this.props;
    return (
      <View
        style={{
          flex: 0,
          paddingHorizontal: 15,
          paddingTop: 8,
          paddingBottom: 10,
          elevation: 6,
          backgroundColor: "white"
        }}
      >
        <Header2 color={"primary"}>Seleziona il libro che vuoi vendere</Header2>
        <View
          style={{
            flex: 0,
            flexDirection: "row",
            marginTop: 6,
            borderRadius: 6,
            overflow: "hidden",
            backgroundColor: "white",
            elevation: 2
          }}
        >
          <TextInput
            onChangeText={onChangeText}
            value={searchQuery}
            style={{ flex: 1, fontSize: 22, marginLeft: 6, marginRight: 30 }}
            blurOnSubmit={true}
            autoFocus={true}
            placeholder={"eg: Matematica Verde 3"}
          />
          <Button
            onPress={resetSearchBar}
            style={{ right: 10, alignSelf: "center" }}
          >
            <Icon
              name="times"
              size={24}
              style={{ color: "black", alignSelf: "center" }}
            />
          </Button>
        </View>
      </View>
    );
  }
}
