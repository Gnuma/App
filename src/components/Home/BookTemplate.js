import React, { Component } from "react";
import { View, Platform, StyleSheet, Dimensions } from "react-native";
import { ParallaxImage } from "react-native-snap-carousel";
import { slideHeight, itemWidth, itemHorizontalMargin } from "./styles";
import { Header1 } from "../Text";
import colors from "../../styles/colors";
import Button from "../Button";

const IS_IOS = Platform.OS === "ios";

export default class BookTemplate extends Component {
  get image() {
    const {
      data: { img },
      parallaxProps
    } = this.props;
    return (
      <ParallaxImage
        source={require("../../media/imgs/mockHomeBook.png")}
        containerStyle={{
          flex: 1,
          marginBottom: IS_IOS ? 0 : -1, // Prevent a random Android rendering issue
          backgroundColor: colors.white,
          borderRadius: 6
        }}
        style={{
          ...StyleSheet.absoluteFillObject,
          resizeMode: "contain",
          borderRadius: 6 //Watch out for IOS border radius "BUG" -> carousel example
        }}
        parallaxFactor={0.1}
        showSpinner={true}
        spinnerColor={"rgba(255, 255, 255, 0.4)"}
        {...parallaxProps}
      />
    );
  }

  render() {
    const {
      data: { title, startingPrice }
    } = this.props;
    return (
      <View
        style={{
          width: itemWidth,
          height: slideHeight,
          paddingHorizontal: itemHorizontalMargin
        }}
      >
        <Button
          style={{
            flex: 1,
            backgroundColor: "white",
            elevation: 5,
            borderRadius: 6
          }}
          onPress={this._onBookPick}
        >
          {this.image}
        </Button>
        <View style={{ justifyContent: "center", paddingTop: 10 }}>
          <Header1 color={"primary"} numberOfLines={1}>
            {title}
          </Header1>
        </View>
      </View>
    );
  }

  _onBookPick = () => {
    this.props.onPress(this.props.data.title);
  };
}
