import React, { Component } from "react";
import { View } from "react-native";
import { OffertInfo, DecisionBox } from "./General";
import Card from "../Card";
import { Header3 } from "../Text";
import Button from "../Button";
import Icon from "react-native-vector-icons/FontAwesome";
import PriceInput from "../Sell/PriceInput";
import FullButton from "../FullButton";
import colors from "../../styles/colors";

export default (CreateOffert = ({
  item,
  price,
  setPrice,
  focusPrice,
  createOffert
}) => {
  return (
    <View style={{ flex: 1 }}>
      <OffertInfo item={item}>
        <Card>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Header3
              color="primary"
              numberOfLines={1}
              style={{ flex: 1, marginRight: 5 }}
            >
              Scegli il prezzo
            </Header3>
            <Button
              style={{ borderRadius: 13, padding: 4 }}
              onPress={focusPrice}
            >
              <Icon
                name="pencil"
                size={22}
                style={{
                  color: colors.black
                }}
              />
            </Button>
          </View>
          <PriceInput
            onChangeText={setPrice}
            value={price}
            containerStyle={{ marginVertical: 5, alignSelf: "center" }}
            onFocus={() => setPrice("")}
          />
        </Card>
      </OffertInfo>
      <DecisionBox>
        <FullButton
          onPress={createOffert}
          value="Fai una offerta"
          icon="tags"
          style={{ marginBottom: 6 }}
          contentStyle={{ flex: 1, textAlign: "center" }}
        />
      </DecisionBox>
    </View>
  );
});