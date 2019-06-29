import React, { Component } from "react";
import { Text, View } from "react-native";
import { OffertInfo, DecisionBox } from "./General";
import Card from "../Card";
import { Header2, Header1 } from "../Text";
import FullButton from "../FullButton";

export default (EditOffert = ({ item, offert, removeOffert }) => {
  return (
    <View style={{ flex: 1 }}>
      <OffertInfo item={item}>
        <Card>
          <View
            style={{
              flexDirection: "row",
              alignSelf: "center",
              alignContent: "center"
            }}
          >
            <Header2
              color="secondary"
              numberOfLines={1}
              style={{ marginRight: 12, textAlignVertical: "center" }}
            >
              Offerta
            </Header2>
            <Header1 color="primary" style={{ alignSelf: "center" }}>
              EUR {offert.value}
            </Header1>
          </View>
        </Card>
      </OffertInfo>
      <DecisionBox>
        <FullButton
          onPress={removeOffert}
          value="Rimuovi Offerta"
          icon="times"
          style={{ marginVertical: 4 }}
          contentStyle={{ flex: 1, textAlign: "center" }}
          color={"darkRed"}
        />
      </DecisionBox>
    </View>
  );
});
