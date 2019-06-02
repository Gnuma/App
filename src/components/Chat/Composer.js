import React, { Component } from "react";
import { View, Text, TextInput, KeyboardAvoidingView } from "react-native";
import Button from "../Button";
import colors from "../../styles/colors";
import Icon from "react-native-vector-icons/FontAwesome";
import { Header4 } from "../Text";

export default class Composer extends Component {
  state = {
    recording: false
  };

  render() {
    const { text, onSend, onComposerTextChanged, data, type } = this.props;
    const showPendingWarning = type === "shopping" && data.status === "pending";
    return (
      <View
        style={{
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        {showPendingWarning ? (
          <Header4 style={{ marginHorizontal: 20 }}>
            Ricorda che {data.UserTO.username} non potrà vedere i tuoi messaggi
            finchè non accetterà la conversazione
          </Header4>
        ) : null}
        <View
          style={{
            flexDirection: "row",
            borderRadius: 10,
            backgroundColor: colors.white,
            elevation: 2,
            marginBottom: 10,
            marginTop: 5,
            marginHorizontal: 20
          }}
        >
          <TextInput
            style={{ flex: 1, fontSize: 18, maxHeight: 130, paddingLeft: 14 }}
            multiline={true}
            placeholder="Scrivi un messaggio"
            onChangeText={onComposerTextChanged}
            value={text}
          />
          {text ? (
            <Button
              style={{
                paddingHorizontal: 5,
                paddingVertical: 2,
                marginHorizontal: 15,
                textAlign: "center",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 26,
                backgroundColor: colors.white
              }}
              onPress={onSend}
              disabled={!text}
            >
              <Icon
                name={"paper-plane"}
                size={26}
                style={{ color: !text ? colors.black : colors.secondary }}
              />
            </Button>
          ) : (
            <Button
              style={{
                marginHorizontal: 15,
                textAlign: "center",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 15,
                backgroundColor: colors.secondary
              }}
              onPress={onSend}
            >
              <Icon
                name={"microphone"}
                size={40}
                style={{
                  color: !text ? colors.black : colors.primary,
                  flex: 1
                }}
              />
            </Button>
          )}
        </View>
      </View>
    );
  }
}
