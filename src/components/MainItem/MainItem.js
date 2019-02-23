import React, { Component } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { MainItemStyles as styles } from "./styles";
import { PrimaryInfo, DescriptionInfo, SecondaryInfo } from "./ItemInfos";
import SellerInfo from "./SellerInfo";
import ImageSlider from "./ImageSlider";
import Divider from "../Divider";

export class MainItem extends Component {
  render() {
    const { data } = this.props;
    const primaryData = {
      price: data.price,
      conditions: data.conditions,
      office: data.seller.office
    };
    const sellerData = data.seller;
    const secondaryData = {
      book: data.book
    };

    return (
      <ScrollView style={styles.scrollView}>
        <ImageSlider style={styles.imageSlider} />
        <View style={styles.content}>
          <PrimaryInfo data={primaryData} />
          <SellerInfo data={sellerData} />
          <Divider style={styles.bigDivider} />
          <DescriptionInfo data={data.description} />
          <Divider style={styles.smallDivider} />
          <SecondaryInfo data={secondaryData} />
          <Divider style={styles.smallDivider} />
        </View>
      </ScrollView>
    );
  }
}

export default MainItem;
