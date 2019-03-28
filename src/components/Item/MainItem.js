import React, { Component } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { MainItemStyles as styles } from "./styles";
import { PrimaryInfo, DescriptionInfo, SecondaryInfo } from "./ItemInfos";
import SellerInfo from "./SellerInfo";
import ImageSlider from "./ImageSlider";
import Divider from "../Divider";
import QuipuComment from "../Comments/QuipuComment";

export class MainItem extends Component {
  render() {
    const { data } = this.props;
    const primaryData = {
      price: data.price,
      conditions: data.condition,
      office: data.seller.classM.office
    };
    const sellerData = data.seller.user;
    const secondaryData = {
      book: data.book
    };
    return (
      <ScrollView style={styles.scrollView}>
        <ImageSlider style={styles.imageSlider} data={data.image_ad} />
        <View style={styles.content}>
          <PrimaryInfo data={primaryData} />
          <SellerInfo data={sellerData} />
          <Divider style={styles.bigDivider} />
          <DescriptionInfo data={data.description} />
          <Divider style={styles.smallDivider} />
          <SecondaryInfo data={secondaryData} />
          <Divider style={styles.smallDivider} />
          <QuipuComment data={data.comments} />
        </View>
      </ScrollView>
    );
  }
}

export default MainItem;
