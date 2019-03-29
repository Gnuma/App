import React, { Component } from "react";
import { View, Image, Dimensions, StyleSheet } from "react-native";
import Carousel, { Pagination } from "react-native-snap-carousel";
import BookTemplate from "./BookTemplate";
import { sliderWidth, itemWidth } from "./styles";
import colors from "../../styles/colors";

export default class BookShelf extends Component {
  state = {
    width: Dimensions.get("window").width,
    activeSlide: 0
  };

  _renderItem = ({ item, index }, parallaxProps) => {
    return (
      <BookTemplate
        data={item}
        parallaxProps={parallaxProps}
        onPress={this.props.onPress}
      />
    );
  };

  render() {
    const { activeSlide } = this.state;
    return (
      <View>
        <Carousel
          ref={c => (this.bookShelf = c)}
          data={data}
          renderItem={this._renderItem}
          sliderWidth={sliderWidth}
          itemWidth={itemWidth}
          hasParallaxImages={true}
          inactiveSlideScale={0.82}
          inactiveSlideOpacity={0.8}
          //inactiveSlideShift={20}
          //containerCustomStyle={styles.slider}
          //contentContainerCustomStyle={styles.sliderContentContainer}
          //loop={true}
          onSnapToItem={index => this.setState({ activeSlide: index })}
        />
        <Pagination
          dotsLength={data.length}
          activeDotIndex={activeSlide}
          //containerStyle={styles.paginationContainer}
          dotColor={colors.black}
          dotStyle={{
            width: 7,
            height: 14
          }}
          inactiveDotColor={colors.black}
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.6}
          carouselRef={this.bookShelf}
          tappableDots={!!this._slider1Ref}
        />
      </View>
    );
  }
}

const data = [
  {
    title: "Matematica Verde 3",
    startingPrice: 13,
    img: "../../media/imgs/mockHomeBook.png"
  },
  {
    title: "Il Blu e il Rosso",
    startingPrice: 15,
    img: "../../media/imgs/mockHomeBook.png"
  },
  {
    title: "Un passo in dietro nella storia",
    startingPrice: 12,
    img: "../../media/imgs/mockHomeBook.png"
  },
  {
    title: "Cloud",
    startingPrice: 16,
    img: "../../media/imgs/mockHomeBook.png"
  }
];
