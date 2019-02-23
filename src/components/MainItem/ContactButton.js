import React, { Component } from "react";
import { Text, View } from "react-native";
import Button from "../Button";
import { Header2 } from "../Text";

export class ContactButton extends Component {
  render() {
    return (
      <View style={{ position: "absolute", bottom: 0, alignSelf: "center" }}>
        <Button
          style={{
            backgroundColor: "white",
            elevation: 4,
            flexDirection: "row",
            padding: 10,
            justifyContent: "center",
            borderRadius: 8,
            marginBottom: 10
          }}
        >
          <Header2 color={"secondary"}>Contatta Ora</Header2>
        </Button>
      </View>
    );
  }
}

export default ContactButton;
