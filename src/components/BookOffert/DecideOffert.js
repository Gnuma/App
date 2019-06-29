import React from "react";
import { View } from "react-native";
import { OffertInfo, DecisionBox } from "./General";
import Card from "../Card";
import { Header3, Header2, Header1 } from "../Text";
import FullButton from "../FullButton";

export default (DecideOffert = ({
  item,
  offert,
  rejectOffert,
  acceptOffert
}) => {
  console.log(item, offert);
  return (
    <View style={{ flex: 1 }}>
      <OffertInfo item={item}>
        <Card style={{ marginVertical: 10 }}>
          <View style={{ flexDirection: "row", alignContent: "flex-end" }}>
            <Header2 style={{ flex: 1, marginRight: 5 }} color="black">
              {offert.creator.user.username}
            </Header2>
            <Header3 color="secondary">Offerta</Header3>
          </View>
          <Header1 color="primary" style={{ alignSelf: "center" }}>
            EUR {offert.value}
          </Header1>
        </Card>
        <Card>
          <View style={{ flexDirection: "row" }}>
            <Header2 color="black">{offert.creator.user.username}</Header2>
          </View>
        </Card>
      </OffertInfo>
      <DecisionBox>
        <FullButton
          value="Rifiuta"
          onPress={rejectOffert}
          icon="times"
          style={{ marginVertical: 4 }}
          contentStyle={{ flex: 1, textAlign: "center" }}
          color={"darkRed"}
        />
        <FullButton
          value="Accetta"
          onPress={acceptOffert}
          icon="check"
          style={{ marginBottom: 6 }}
          contentStyle={{ flex: 1, textAlign: "center" }}
        />
      </DecisionBox>
    </View>
  );
});
