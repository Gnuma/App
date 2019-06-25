import React, { Component } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  InteractionManager,
  Animated,
  Dimensions
} from "react-native";
import { MainItemStyles as styles } from "./styles";
import { PrimaryInfo, DescriptionInfo, SecondaryInfo } from "./ItemInfos";
import SellerInfo from "./SellerInfo";
import ImageSlider from "./ImageSlider";
import Divider from "../Divider";
import QuipuComment from "../Comments/QuipuComment";
import ContactButton from "./ContactButton";

export class MainItem extends Component {
  state = {
    scrollY: new Animated.Value(0),
    viewHeight: this.props.viewHeight,
    contactButtonHeight: 50,
    contactSnapY: 1500
  };

  scrollEvent = Animated.event(
    [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }],
    {
      useNativeDriver: true
    }
  );

  setContactButtonHeight = contactButtonHeight => {
    this.setState({
      contactButtonHeight
    });
  };

  render() {
    const { data, user, newComments, isOwner } = this.props;
    const primaryData = {
      price: data.price,
      conditions: data.condition,
      office: data.seller.classM.office
    };
    const sellerData = data.seller.user;
    const secondaryData = {
      book: data.book
    };
    console.log(data.seller);

    return (
      <Animated.ScrollView
        style={styles.scrollView}
        keyboardShouldPersistTaps={"handled"}
        ref={component => (this.scrollView = component)}
        onScroll={this.scrollEvent}
        onLayout={event =>
          this.setState({
            viewHeight: event.nativeEvent.layout.height
          })
        }
        scrollEventThrottle={1}
      >
        <ImageSlider style={styles.imageSlider} data={data.image_ad} />
        <View style={styles.content} onLayout={this._setContainerOffset}>
          <PrimaryInfo data={primaryData} />
          <SellerInfo data={sellerData} />
          <View
            style={{
              height: this.state.contactButtonHeight,
              marginVertical: 10
            }}
            onLayout={event => {
              this.setState({ contactSnapY: event.nativeEvent.layout.y });
              console.log(event.nativeEvent);
            }}
          />
          <Divider style={styles.bigDivider} />
          <DescriptionInfo data={data.description} />
          <Divider style={styles.smallDivider} />
          <SecondaryInfo data={secondaryData} />
          <Divider style={styles.smallDivider} />
          {/*data.comments*/ true ? (
            <QuipuComment
              data={data.comment_ad}
              sellerPK={data.seller._id}
              scrollTo={this._scrollTo}
              ref={comments => (this.comments = comments)}
              user={user}
              itemPK={data.pk}
              newComments={newComments}
            />
          ) : null}
        </View>
        <ContactButton
          onContact={this.props.onContact}
          scrollY={this.state.scrollY}
          viewHeight={this.state.viewHeight}
          setContactButtonHeight={this.setContactButtonHeight}
          contactSnapY={this.containerOffset + this.state.contactSnapY}
          isOwner={isOwner}
        />
      </Animated.ScrollView>
    );
  }

  _scrollTo = y => {
    //console.log(y);
    console.log(y);
    y += this.containerOffset;
    this.scrollView.getNode().scrollTo({ x: 0, y, animated: true });
  };

  _setContainerOffset = event => {
    const layout = event.nativeEvent.layout;
    this.containerOffset = layout.y;
  };

  containerOffset = 0;
}

export default MainItem;
