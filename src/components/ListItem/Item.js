import React, { Component } from "react";
import { Text, View, Image } from "react-native";
import PropTypes from "prop-types";
import styles from "./styles";
import { Header1, Header3, Header4, Header5 } from "../../components/Text";
import ConditionCircle from "../ConditionCircle";

const itemHeight = 130;

export default class Item extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    isSingle: PropTypes.bool
  };
  render() {
    const { isSingle, data } = this.props;
    const { name, id, img, authors, price, seller, conditions, office } = data;
    return (
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          height: itemHeight,
          borderRadius: 10,
          borderTopLeftRadius: isSingle ? 10 : 0,
          borderTopRightRadius: isSingle ? 10 : 0,

          backgroundColor: "white",

          elevation: 5,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84
        }}
      >
        <Image
          style={{
            height: itemHeight,
            width: 122,
            borderTopLeftRadius: isSingle ? 10 : 0,
            borderBottomLeftRadius: 10
          }}
          source={require("../../media/imgs/thumbnail-test.png")}
        />
        <View style={{ flex: 1, marginLeft: 5 }}>
          <View style={{ flex: 2, flexDirection: "row" }}>
            <View style={{ flex: 3 }}>
              <Header3>{seller}</Header3>
              <Header1>EUR {price}</Header1>
            </View>
            <View style={{ margin: 10 }}>
              <ConditionCircle conditions={conditions} />
            </View>
          </View>
          <View style={{ flex: 1 }}>
            <Header4>{office.name}</Header4>
            <Header5 style={{ marginLeft: 4 }}>{office.address}</Header5>
          </View>
        </View>
      </View>
    );
  }
}
