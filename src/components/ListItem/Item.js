import React, { Component } from "react";
import { Text, View, Image } from "react-native";
import PropTypes from "prop-types";
import styles from "./styles";
import { Header1, Header3, Header4, Header5 } from "../../components/Text";
import ConditionCircle from "../ConditionCircle";

export default class Item extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    isSingle: PropTypes.bool
  };
  render() {
    const { isSingle, data } = this.props;
    //console.log(data);
    const { price, seller, condition, book } = data;
    const office = seller.classM.office;
    return (
      <View
        style={[
          styles.itemContainer,
          {
            borderTopLeftRadius: isSingle ? 10 : 0,
            borderTopRightRadius: isSingle ? 10 : 0
          }
        ]}
      >
        <Image
          style={[
            styles.image,
            {
              borderTopLeftRadius: isSingle ? 10 : 0
            }
          ]}
          source={require("../../media/imgs/thumbnail-test.png")}
        />
        <View style={styles.itemContent}>
          <View style={styles.itemTopContent}>
            <View style={styles.leftColTopContent}>
              <Header3 color="black">{seller.user.username}</Header3>
              <Header1 color="primary">EUR {price}</Header1>
            </View>
            <View style={styles.m10}>
              <ConditionCircle
                conditions={condition}
                radius={35}
                style={styles.m10}
              />
            </View>
          </View>
          <View style={styles.itemBottomContent}>
            <Header4 color="black">{office.name}</Header4>
            <Header5 style={styles.ml15}>{office.cap}</Header5>
          </View>
        </View>
      </View>
    );
  }
}
