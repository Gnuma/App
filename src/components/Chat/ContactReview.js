import React, { Component } from "react";
import { Text, View, ActivityIndicator } from "react-native";
import colors from "../../styles/colors";
import { Header3 } from "../Text";
import SolidButton from "../SolidButton";

export default class ContactReview extends Component {
  render() {
    const { username, onSettle, status, itemID, chatID } = this.props;
    const isLoading = status === "loadingDecision";

    return (
      <View
        style={{
          flex: 1,
          justifyContent: "flex-end",
          marginHorizontal: 20,
          marginBottom: 10
        }}
      >
        <View
          style={{
            backgroundColor: colors.white,
            elevation: 2,
            borderRadius: 6,
            padding: 10
          }}
        >
          <Header3 color="black" style={{ marginBottom: 10 }}>
            {username} vuole iniziare una conversazione con te riguardo questo
            libro!
          </Header3>
          {isLoading ? (
            <ActivityIndicator size="large" color={colors.secondary} />
          ) : (
            <View>
              <SolidButton
                icon="times"
                iconSize={20}
                style={{ paddingVertical: 6 }}
                iconStyle={{ color: colors.darkRed }}
                onPress={() => onSettle(itemID, chatID, false)}
              >
                <Header3 color="darkRed" style={{ textAlign: "center" }}>
                  Rifiuta
                </Header3>
              </SolidButton>
              <SolidButton
                icon="check"
                iconSize={20}
                style={{ paddingVertical: 6 }}
                iconStyle={{ color: colors.primary }}
                onPress={() => onSettle(itemID, chatID, true)}
              >
                <Header3 color="primary" style={{ textAlign: "center" }}>
                  Accetta
                </Header3>
              </SolidButton>
            </View>
          )}
        </View>
      </View>
    );
  }
}
