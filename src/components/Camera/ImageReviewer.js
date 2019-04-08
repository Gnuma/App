import React, { Component } from "react";
import {
  View,
  StyleSheet,
  ImageBackground,
  PanResponder,
  Animated,
  Dimensions
} from "react-native";
import PropTypes from "prop-types";
import colors from "../../styles/colors";
import Button from "../Button";
import Icon from "react-native-vector-icons/FontAwesome";

export default class ImageReviewer extends Component {
  constructor(props) {
    super(props);

    this.leftBound = 0;
    this.rightBound = Dimensions.get("screen").width;

    const screenWidth = Dimensions.get("screen").width;
    const screenHeight = Dimensions.get("screen").height;

    const horizontalBound = this.rightBound - this.leftBound - 50;
    const verticalBound = props.bottomBound - props.topBound - 50;
    if (horizontalBound > verticalBound) {
      this.containerHeight = verticalBound;
      this.containerWidth = this.containerHeight * imageWidth;
    } else {
      this.containerWidth = horizontalBound;
      this.containerHeight = this.containerWidth * imageHeight;
    }
    const offset = {
      x: (screenWidth - this.containerWidth) / 2,
      y: (screenHeight - this.containerHeight) / 2
    };

    this.state = {
      position: new Animated.ValueXY(offset)
      //scale: new Animated.Value(100)
    };

    this._local_setReviewOptions({
      offset,
      size: {
        width: this.containerWidth,
        height: this.containerHeight
      }
    });

    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      // Check if the touch is close enought to one of the corners
      onStartShouldSetPanResponderCapture: (evt, gestureState) => {
        /*this.focus = this.sholudStartResize(
          evt.nativeEvent.pageX,
          evt.nativeEvent.pageY
        );*/
        this.initialCoordinates = {
          x: this.state.position.x._value,
          y: this.state.position.y._value
        };
        this.state.position.setOffset(this.initialCoordinates);

        /*if (!this.focus) {
          this.initialCoordinates = {
            x: this.state.position.x._value,
            y: this.state.position.y._value
          };
          this.state.position.setOffset(this.initialCoordinates);
        } else {
          this.initialCoordinates = {
            x: this.state.position.x._value,
            y: this.state.position.y._value
          };
          this.state.position.setOffset(this.initialCoordinates);
          this.initialSize = this.state.scale._value;
          this.state.scale.setOffset(this.state.scale._value);
          this.center = {
            x: this.state.position.x._value + this.width / 2,
            y: this.state.position.y._value + this.height / 2
          };
          this.initialDistanceToCenter = this.getDistance(
            evt.nativeEvent.pageX,
            evt.nativeEvent.pageY,
            this.center.x,
            this.center.y
          );
          this.initialSizes = {
            width: this.width,
            height: this.height
          };
        }
        */
        return true;
      },
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
      onPanResponderGrant: (evt, gestureState) => {},
      onPanResponderMove: (evt, gestureState) => {
        let dx = gestureState.dx;
        let dy = gestureState.dy;

        dx = Math.max(dx, -this.initialCoordinates.x); //leftBound
        dx = Math.min(
          dx,
          this.rightBound - (this.initialCoordinates.x + this.width)
        ); //rightBound
        dy = Math.max(dy, this.props.headerBound - this.initialCoordinates.y); //topBound
        dy = Math.min(
          dy,
          this.footerBound - (this.initialCoordinates.y + this.height)
        );

        this.state.position.setValue({
          x: dx,
          y: dy
        });
        /*
        if (!this.focus) {
          let dx = gestureState.dx;
          let dy = gestureState.dy;

          dx = Math.max(dx, -this.initialCoordinates.x); //leftBound
          dx = Math.min(
            dx,
            this.rightBound - (this.initialCoordinates.x + this.width)
          ); //rightBound
          dy = Math.max(dy, this.props.headerBound - this.initialCoordinates.y); //topBound
          dy = Math.min(
            dy,
            this.props.footerBound - (this.initialCoordinates.y + this.height)
          );
          this.state.position.setValue({
            x: dx,
            y: dy
          });
        } else {
          const distToCenter = this.getDistance(
            gestureState.moveX,
            gestureState.moveY,
            this.center.x,
            this.center.y
          );
          console.log(distToCenter);
          if (
            distToCenter - this.initialDistanceToCenter >
            100 * imageWidth - this.initialSize
          ) {
            let d = distToCenter - this.initialDistanceToCenter;
            d = Math.max(
              d,
              (this.initialSize / imageWidth - this.rightBound) * imageWidth
            );
            this.state.scale.setValue(d);
            this.state.position.setValue({
              x: (-d / 2) * Math.cos(imageWidth),
              y: (-d / 2) * Math.cos(imageHeight)
            });
          }
        }*/
      },
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onPanResponderRelease: (evt, gestureState) => {
        this.state.position.flattenOffset();
        //this.state.scale.flattenOffset();
        this.focus = null;

        this._local_setReviewOptions({
          offset: {
            x: this.state.position.x._value,
            y: this.state.position.y._value
          },
          size: {
            width: this.containerWidth,
            height: this.containerHeight
          }
        });
      },
      onPanResponderTerminate: (evt, gestureState) => {
        // Another component has become the responder, so this gesture
        // should be cancelled
      },
      onShouldBlockNativeResponder: (evt, gestureState) => {
        // Returns whether this component should block native components from becoming the JS
        // responder. Returns true by default. Is currently only supported on android.
        return true;
      }
    });
  }

  focus = null;
  center = null;

  /*sholudStartResize = (x, y) => {
    const { position } = this.state;
    let distances = {
      topLeft: { x: position.x._value, y: position.y._value },
      topRight: { x: position.x._value + this.width, y: position.y._value },
      bottomLeft: { x: position.x._value, y: position.y._value + this.height },
      bottomRight: {
        x: position.x._value + this.width,
        y: position.y._value + this.height
      }
    };
    let min = null;
    let minDist = null;
    for (let key in distances) {
      const distance = this.getDistance(
        x,
        y,
        distances[key].x,
        distances[key].y
      );
      if (distance < 50 && (!minDist || distance < minDist)) {
        min = key;
        minDist = distance;
      }
    }
    return min;
  };*/

  getDistance = (x1, y1, x2, y2) =>
    Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));

  formatCropData = data => {
    const screenWidth = Dimensions.get("screen").width;
    const screenHeight = Dimensions.get("screen").height;

    return {
      offset: {
        x: data.offset.x / screenWidth,
        y: data.offset.y / screenHeight
      },
      size: {
        width: data.size.width / screenWidth,
        height: data.size.height / screenHeight
      }
    };
  };

  _local_setReviewOptions = data => {
    this.props.setReviewOptions(this.formatCropData(data));
  };

  resetAll = () => {
    const screenWidth = Dimensions.get("screen").width;
    const screenHeight = Dimensions.get("screen").height;

    const horizontalBound = this.rightBound - this.leftBound - 50;
    const verticalBound = this.props.bottomBound - this.props.topBound - 50;
    if (horizontalBound > verticalBound) {
      this.containerHeight = verticalBound;
      this.containerWidth = this.containerHeight * imageWidth;
    } else {
      this.containerWidth = horizontalBound;
      this.containerHeight = this.containerWidth * imageHeight;
    }
    const offset = {
      x: (screenWidth - this.containerWidth) / 2,
      y: (screenHeight - this.containerHeight) / 2
    };

    this.setState({
      position: new Animated.ValueXY(offset)
      //scale: new Animated.Value(100)
    });

    this._local_setReviewOptions({
      offset,
      size: {
        width: this.containerWidth,
        height: this.containerHeight
      }
    });
  };

  render() {
    const { data } = this.props;
    return (
      <View style={StyleSheet.absoluteFill}>
        <View style={{ flex: 1 }} {...this._panResponder.panHandlers}>
          <ImageBackground
            style={{ flex: 1 }}
            source={{ uri: data[0].uri ? data[0].uri : data[0].path }}
          />
          <Animated.View
            style={{
              position: "absolute",
              padding: 10,
              /*
            width: this.state.scale.interpolate({
              inputRange: [0, 1],
              outputRange: [0, imageWidth]
            }),
            height: this.state.scale.interpolate({
              inputRange: [0, 1],
              outputRange: [0, imageHeight]
            }),*/
              width: this.containerWidth,
              height: this.containerHeight,
              transform: [
                {
                  translateX: this.state.position.x.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 1]
                  })
                },
                {
                  translateY: this.state.position.y.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 1]
                  })
                }
              ]
            }}
          >
            <View
              style={{ flex: 1, borderWidth: 1, borderColor: colors.white }}
            />
            <View
              style={{
                position: "absolute",
                width: 20,
                height: 20,
                backgroundColor: colors.white,
                left: 0,
                top: 0,
                borderRadius: 10
              }}
            />
            <View
              style={{
                position: "absolute",
                width: 20,
                height: 20,
                backgroundColor: colors.white,
                top: 0,
                right: 0,
                borderRadius: 10
              }}
            />
            <View
              style={{
                position: "absolute",
                width: 20,
                height: 20,
                backgroundColor: colors.white,
                left: 0,
                bottom: 0,
                borderRadius: 10
              }}
            />
            <View
              style={{
                position: "absolute",
                width: 20,
                height: 20,
                backgroundColor: colors.white,
                bottom: 0,
                right: 0,
                borderRadius: 10
              }}
            />
          </Animated.View>
        </View>

        {this.renderFooter()}
      </View>
    );
  }
  renderFooter = () => {
    return (
      <View
        style={{
          flex: 0,
          flexDirection: "row",
          justifyContent: "center",
          paddingVertical: 15,
          backgroundColor: colors.black
        }}
        onLayout={event => (this.footerBound = event.nativeEvent.layout.y - 5)}
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
            onPress={() => this.props.handleReview(true)}
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
          <Button onPress={() => this.props.handleReview(false)}>
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
    );
  };
  /*
  get width() {
    return imageWidth * this.state.scale._value;
  }
  get height() {
    return imageHeight * this.state.scale._value;
  }*/
  get width() {
    return this.containerWidth;
  }
  get height() {
    return this.containerHeight;
  }
}

const imageWidth = 3 / 4;
const imageHeight = 4 / 3;

//<View style={{ flex: 1, backgroundColor: "rgba(0, 0, 0, 0.4)" }} />

/*
<Animated.View
          style={{
            position: "absolute",
            backgroundColor: colors.red,
            width: imageWidth,
            height: imageHeight,
            transform: [
              ...this.state.position.getTranslateTransform(),
              {
                scale: this.state.scale.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 1]
                })
              }
            ]
          }}
        >
        */
