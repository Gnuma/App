import React, { Component } from "react";
import { View, Text, FlatList, ScrollView, Animated } from "react-native";
import PropTypes from "prop-types";
import { Header3, Header2 } from "../Text";
import Button from "../Button";
import _ from "lodash";
import colors from "../../styles/colors";

export class ShoppingTab extends Component {
  constructor(props) {
    super(props);

    this.layout = {};
    this.state = {
      barPosition: new Animated.Value(-1),
      barScale: new Animated.Value(0)
    };
  }

  static propTypes = {};

  initBar = itemID => {
    this.moveBar(itemID);
  };

  moveBar = itemID => {
    this.tabBar.scrollTo({ x: this.layout[itemID].x });
    Animated.timing(this.state.barPosition, {
      toValue: this.layout[itemID].x + this.layout[itemID].width / 2,
      duration: 200,
      useNativeDriver: true
    }).start();
    Animated.timing(this.state.barScale, {
      toValue: this.layout[itemID].width - 40,
      duration: 200,
      useNativeDriver: true
    }).start();
  };

  switchTab = itemID => {
    this.moveBar(itemID);
  };

  render() {
    const { data } = this.props;
    return (
      <View
        style={{
          backgroundColor: colors.white,
          //borderBottomLeftRadius: 6,
          //borderBottomRightRadius: 6,
          elevation: 2
        }}
      >
        <ScrollView
          horizontal
          ref={ref => (this.tabBar = ref)}
          style={{ paddingBottom: 10 }}
          centerContent={true}
          showsHorizontalScrollIndicator={false}
        >
          <View style={{ flexDirection: "row" }}>
            {data.map(item => this._renderItem(item))}
          </View>
          <Animated.View
            style={{
              position: "absolute",
              bottom: 0,
              borderBottomWidth: 2,
              borderColor: colors.primary,
              width: 1,
              transform: [
                {
                  translateX: this.state.barPosition.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 1]
                  })
                },
                {
                  scaleX: this.state.barScale.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 1]
                  })
                }
              ]
            }}
          />
        </ScrollView>
      </View>
    );
  }

  _renderItem = item => {
    return (
      <Button
        onLayout={event => {
          if (_.isEmpty(this.layout)) {
            this.layout[item._id] = {
              x: event.nativeEvent.layout.x,
              width: event.nativeEvent.layout.width
            };
            this.initBar(item._id);
          } else {
            this.layout[item._id] = {
              x: event.nativeEvent.layout.x,
              width: event.nativeEvent.layout.width
            };
          }
        }}
        key={item._id}
        onPress={() => this.switchTab(item._id)}
        style={{
          paddingHorizontal: 10
        }}
      >
        <Header2 color="black" style={{ marginVertical: 10 }}>
          {item.title}
        </Header2>
        <View
          style={{
            borderBottomWidth: 2,
            borderColor: colors.red,
            marginHorizontal: 10
          }}
        />
      </Button>
    );
  };
}

export default ShoppingTab;
