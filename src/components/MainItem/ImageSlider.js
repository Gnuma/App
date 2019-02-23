import React, { Component } from "react";
import { View, Image, Dimensions, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import Carousel from "react-native-snap-carousel";

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
      <View style={styles.itemContainer}>
        <View style={styles.imageContainer}>
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
      <View style={[this.props.style]}>
        <Carousel
          data={this.data}
          renderItem={this._renderItem}
          itemWidth={width - imgMargin}
          sliderWidth={width}
          sliderHeight={height + 10}
          inactiveSlideScale={1}
          inactiveSlideOpacity={1}
        />
      </View>
    );
  }
}

export default ImageSlider;

const styles = StyleSheet.create({
  itemContainer: {
    borderRadius: 8,
    backgroundColor: "white",
    margin: 10,
    elevation: 4
  },
  imageContainer: {
    overflow: "hidden",
    borderRadius: 8
  }
});
