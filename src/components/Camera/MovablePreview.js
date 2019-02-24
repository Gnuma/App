import React, { Component } from "react";
import {
  Text,
  View,
  Animated,
  Image,
  TouchableWithoutFeedback,
  PanResponder
} from "react-native";

export default class MovablePreview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pan: new Animated.ValueXY({
        x: props.item.fx,
        y: props.item.fy
      })
    };
    this.state.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onStartShouldSetPanResponderCapture: () => true,
      onMoveShouldSetResponderCapture: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
      onPanResponderMove: Animated.event([
        null,
        { dx: this.state.pan.x, dy: this.state.pan.y }
      ]),
      onPanResponderRelease: () => {
        props.setDragging(null);
      }
    });
  }

  render() {
    const { item } = this.props.item;
    if (item === null) return null;
    return (
      <Animated.View
        style={[
          {
            borderRadius: 4,
            overflow: "hidden",
            marginHorizontal: 6,
            elevation: 4,
            borderColor: "red",
            borderWidth: 2,
            position: "absolute"
          },
          this.state.pan.getLayout()
        ]}
        {...this.state.panResponder.panHandlers}
      >
        <Image
          style={{
            height: 70,
            width: 52,
            justifyContent: "center",
            alignItems: "center"
          }}
          source={item}
          resizeMode="stretch"
        />
      </Animated.View>
    );
  }
}
