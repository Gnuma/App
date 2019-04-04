import React, { Component } from "react";
import { View, StyleSheet, ScrollView, InteractionManager } from "react-native";
import { MainItemStyles as styles } from "./styles";
import { PrimaryInfo, DescriptionInfo, SecondaryInfo } from "./ItemInfos";
import SellerInfo from "./SellerInfo";
import ImageSlider from "./ImageSlider";
import Divider from "../Divider";
import QuipuComment from "../Comments/QuipuComment";

export class MainItem extends Component {
  componentDidMount() {
    console.log(this.props.goToComment());
    if (this.props.goToComment && this.props.goToComment()) {
      InteractionManager.runAfterInteractions(() => {
        this.comments._onAnswer(this.props.goToComment());
      });
    }
  }

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
      <ScrollView
        style={styles.scrollView}
        keyboardShouldPersistTaps={"handled"}
        ref={component => (this.scrollView = component)}
      >
        <ImageSlider style={styles.imageSlider} data={data.image_ad} />
        <View style={styles.content}>
          <PrimaryInfo data={primaryData} />
          <SellerInfo data={sellerData} />
          <Divider style={styles.bigDivider} />
          <DescriptionInfo data={data.description} />
          <Divider style={styles.smallDivider} />
          <SecondaryInfo data={secondaryData} />
          <Divider style={styles.smallDivider} />
          {/*data.comments*/ true ? (
            <QuipuComment
              data={data.comment_ad}
              sellerPK={data.seller.user.pk}
              scrollTo={this._scrollTo}
              ref={comments => (this.comments = comments)}
              user={{
                username: "Bob",
                id: 10
              }}
              itemPK={data.pk}
            />
          ) : null}
        </View>
      </ScrollView>
    );
  }

  _scrollTo = y => {
    //console.log(y);
    this.scrollView.scrollTo({ x: 0, y, animated: true });
  };
}

export default MainItem;
