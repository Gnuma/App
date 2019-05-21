import React, { Component } from "react";
import { View, StyleSheet, Animated, Dimensions, Image } from "react-native";
import PropTypes from "prop-types";
import colors from "../../styles/colors";
import Button from "../Button";
import Icon from "react-native-vector-icons/FontAwesome";
import {
  PinchGestureHandler,
  PanGestureHandler,
  State
} from "react-native-gesture-handler";
import { ___BOOK_IMG_RATIO___ } from "../../utils/constants";

const { height: hW, width: wW } = Dimensions.get("window");
const minScale = 0.3;

export default class ImageReviewer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      layout: null,
      right_c: wW,
      bottom_c: hW,
      left_c: 0,
      top_c: 0,
      scale_c: 1
    };
  }

  pan = new Animated.ValueXY();
  lastPan = { x: 0, y: 0 };

  baseScale = new Animated.Value(1);
  pinchScale = new Animated.Value(1);
  scale = Animated.multiply(this.baseScale, this.pinchScale);
  lastScale = 0.9;

  cropperHeight = 0;
  cropperWidth = 0;

  handleReview = isValid => {
    if (isValid) {
      const dx = (this.cropperWidth - this.cropperWidth * this.lastScale) / 2;
      const dy = (this.cropperHeight - this.cropperHeight * this.lastScale) / 2;

      const offsetPercentage = {
        x: Math.min(
          Math.max(0, (this.lastPan.x + dx) / this.cropperWidth),
          100
        ),
        y: Math.min(
          Math.max(0, (this.lastPan.y + dy) / this.cropperHeight),
          100
        )
      };
      const sizePercentage = {
        width: Math.min(
          100,
          Math.max(0, (this.cropperWidth * this.lastScale) / this.cropperWidth)
        ),
        height: Math.min(
          100,
          Math.max(
            0,
            (this.cropperHeight * this.lastScale) / this.cropperHeight
          )
        )
      };

      console.log(offsetPercentage, sizePercentage);
      this.props.handleReview(true, offsetPercentage, sizePercentage);
    } else {
      this.props.handleReview(false);
    }
  };

  updateLayout = event => {
    const margin = 1;

    const data = this.props.data;
    const imgRatio = data.height / data.width;
    const layoutWidth = event.nativeEvent.layout.width;
    const layoutHeight = event.nativeEvent.layout.height;

    let height, width;
    if (layoutWidth * imgRatio > layoutHeight) {
      console.log("Per Altezza");
      height = layoutHeight;
      width = layoutHeight / imgRatio;
      this.cropperHeight = height - margin;
      this.cropperWidth = this.cropperHeight / ___BOOK_IMG_RATIO___;
    } else {
      console.log("Per Larghezza");
      width = layoutWidth;
      height = layoutWidth * imgRatio;
      this.cropperWidth = width - margin;
      this.cropperHeight = this.cropperWidth * ___BOOK_IMG_RATIO___;
    }

    this.lastScale = 0.9;
    this.baseScale.setValue(this.lastScale);
    this.pinchScale.setValue(1);

    this.lastPan = {
      x: 0,
      y: 0
    };
    this.pan.setOffset(this.lastPan);

    this.setState(
      {
        layout: {
          width,
          height
        },
        right_c: width - this.cropperWidth,
        bottom_c: height - this.cropperHeight
      },
      () => {
        this.updateTranslationConstraints();
      }
    );
  };

  onPanGestureEvent = Animated.event(
    [{ nativeEvent: { translationX: this.pan.x, translationY: this.pan.y } }],
    {
      useNativeDriver: true
    }
  );

  onPinchGestureEvent = Animated.event(
    [{ nativeEvent: { scale: this.pinchScale } }],
    { useNativeDriver: true }
  );

  onPanGestureChange = event => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      this.lastPan.x += event.nativeEvent.translationX;
      this.lastPan.y += event.nativeEvent.translationY;

      this.lastPan.x = Math.min(
        Math.max(this.state.left_c, this.lastPan.x),
        this.state.right_c
      );
      this.lastPan.y = Math.max(
        Math.min(this.state.bottom_c, this.lastPan.y),
        this.state.top_c
      );

      this.pan.setOffset({
        x: this.lastPan.x,
        y: this.lastPan.y
      });
      this.pan.setValue({ x: 0, y: 0 });
      this.updateScaleConstraints();
    }
  };

  onPinchStateChange = event => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      this.lastScale *= event.nativeEvent.scale;
      this.lastScale = Math.max(
        minScale,
        Math.min(this.lastScale, this.state.scale_c)
      );
      this.baseScale.setValue(this.lastScale);
      this.pinchScale.setValue(1);
      this.updateTranslationConstraints();
    }
  };

  updateScaleConstraints = () => {
    const { left_c, top_c, right_c, bottom_c } = this.state;
    const wD = Math.min(this.lastPan.x - left_c, right_c - this.lastPan.x);
    const hD = Math.min(this.lastPan.y - top_c, bottom_c - this.lastPan.y);

    let overScale;
    if (wD < hD) {
      overScale = wD / (this.cropperWidth * this.lastScale);
    } else {
      overScale = hD / (this.cropperHeight * this.lastScale);
    }

    this.setState(({ scale_c: lastScale_c }) => ({
      scale_c: this.lastScale + this.lastScale * overScale * 2
    }));
    console.log(this.lastPan);
  };

  updateTranslationConstraints = () => {
    const dWidth = ((this.lastScale - 1) * this.cropperWidth) / 2;
    const dHeight = ((this.lastScale - 1) * this.cropperHeight) / 2;

    this.setState({
      left_c: dWidth,
      top_c: dHeight,
      right_c: this.state.layout.width - this.cropperWidth - dWidth,
      bottom_c: this.state.layout.height - this.cropperHeight - dHeight
    });

    console.log(this.lastScale);
  };

  render() {
    const { data } = this.props;
    const { layout, left_c, top_c, right_c, bottom_c, scale_c } = this.state;

    return (
      <View style={{ flex: 1 }}>
        <View
          style={{
            flex: 1,
            backgroundColor: colors.fullBlack
          }}
          onLayout={this.updateLayout}
        >
          <Handlers
            onPanGestureChange={this.onPanGestureChange}
            onPanGestureEvent={this.onPanGestureEvent}
            onPinchGestureEvent={this.onPinchGestureEvent}
            onPinchStateChange={this.onPinchStateChange}
          >
            {layout && (
              <View
                style={{
                  height: layout.height,
                  width: layout.width
                }}
              >
                <Image
                  style={{
                    ...StyleSheet.absoluteFill
                  }}
                  source={{ uri: data.uri ? data.uri : data.path }}
                  resizeMode="contain"
                  onLayout={event => console.log(event.nativeEvent)}
                  onLoad={event => console.log(event.nativeEvent)}
                />
                <View style={{ backgroundColor: "red" }}>
                  <Animated.View
                    style={{
                      ...StyleSheet.absoluteFill,
                      width: this.cropperWidth,
                      height: this.cropperHeight,
                      borderColor: colors.white,
                      borderWidth: 2,
                      transform: [
                        {
                          translateX: this.pan.x.interpolate({
                            inputRange: [left_c, right_c],
                            outputRange: [left_c, right_c],
                            extrapolate: "clamp"
                          })
                        },
                        {
                          translateY: this.pan.y.interpolate({
                            inputRange: [top_c, bottom_c],
                            outputRange: [top_c, bottom_c],
                            extrapolate: "clamp"
                          })
                        },
                        {
                          scale: this.scale.interpolate({
                            inputRange: [minScale, scale_c + 0.001],
                            outputRange: [minScale, scale_c],
                            extrapolate: "clamp"
                          })
                        }
                      ]
                    }}
                  />
                </View>
              </View>
            )}
          </Handlers>
        </View>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            paddingVertical: 15
          }}
        >
          <View
            style={{
              flexDirection: "row",
              backgroundColor: "white",
              elevation: 4,
              borderRadius: 6
            }}
          >
            <Button
              onPress={() => this.handleReview(true)}
              style={{ borderRightWidth: 0.5, borderColor: colors.grey }}
            >
              <Icon
                name="check"
                style={{
                  color: colors.secondary,
                  paddingHorizontal: 10,
                  paddingVertical: 3
                }}
                size={40}
              />
            </Button>
            <Button onPress={() => this.handleReview(false)}>
              <Icon
                name="times"
                style={{
                  color: colors.red,
                  paddingHorizontal: 10,
                  paddingVertical: 3
                }}
                size={40}
              />
            </Button>
          </View>
        </View>
      </View>
    );
  }
}

const Handlers = ({
  onPanGestureEvent,
  onPanGestureChange,
  onPinchGestureEvent,
  onPinchStateChange,
  children
}) => {
  return (
    <PanGestureHandler
      onGestureEvent={onPanGestureEvent}
      onHandlerStateChange={onPanGestureChange}
      maxPointers={1}
    >
      <Animated.View style={{ flex: 1 }}>
        <PinchGestureHandler
          onGestureEvent={onPinchGestureEvent}
          onHandlerStateChange={onPinchStateChange}
        >
          <Animated.View style={{ flex: 1, justifyContent: "center" }}>
            {children}
          </Animated.View>
        </PinchGestureHandler>
      </Animated.View>
    </PanGestureHandler>
  );
};
