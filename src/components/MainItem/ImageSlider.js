import React, { Component } from "react";
import {
  View,
  Image,
  Dimensions,
  PanResponder,
  Animated,
  StyleSheet
} from "react-native";
import PropTypes from "prop-types";
import Carousel, { ParallaxImage } from "react-native-snap-carousel";
import { Header1 } from "../Text";

const imgRation = 0.92855;
const imgMargin = 50;

export class ImageSlider extends Component {
  state = {
    width: Dimensions.get("window").width,
    height: (Dimensions.get("window").width - imgMargin) / imgRation
  };

  data = [{}, {}, {}, {}, {}];

  _renderItem = ({ item, index }) => {
    return (
      <View
        style={{
          borderRadius: 8,

          backgroundColor: "white",
          margin: 10,
          elevation: 4
        }}
      >
        <View
          style={{
            overflow: "hidden",
            borderRadius: 8
          }}
        >
          <Image
            style={{
              width: this.state.width - imgMargin,
              height: this.state.height
            }}
            source={require("../../media/imgs/thumbnail-test.png")}
          />
        </View>
      </View>
    );
  };

  render() {
    const { width, height } = this.state;
    return (
      <View style={[{ flex: 1 }, this.props.style]}>
        <View style={{ minHeight: height }}>
          <Carousel
            data={this.data}
            renderItem={this._renderItem}
            itemWidth={this.state.width - imgMargin}
            sliderWidth={width}
            sliderHeight={height + 10}
            inactiveSlideScale={1}
            inactiveSlideOpacity={1}
          />
        </View>
      </View>
    );
  }
}

export default ImageSlider;
