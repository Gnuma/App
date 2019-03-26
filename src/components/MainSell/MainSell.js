import React, { Component } from "react";
import { Text, View, ScrollView } from "react-native";
import { Header2 } from "../Text";
import PriceInfo from "./PriceInfo";
import ConditionsInfo from "./ConditionsInfo";
import DescriptionInfo from "./DescriptionInfo";

export default class MainSell extends Component {
  render() {
    const {
      conditions,
      price,
      description,
      setPrice,
      setDescription,
      setConditions
    } = this.props;
    return (
      <ScrollView style={{ flex: 1, marginTop: 18 }}>
        <PriceInfo price={price} handleChange={setPrice} />
        <ConditionsInfo conditions={conditions} handleChange={setConditions} />
        <DescriptionInfo
          description={description}
          handleChange={setDescription}
        />
      </ScrollView>
    );
  }
}