import React, { Component } from "react";
import { Text, View, Animated, Image, PanResponder } from "react-native";
import Button from "../Button";
import Icon from "react-native-vector-icons/FontAwesome";
import { Header2, Header5, Header3 } from "../Text";
import colors from "../../styles/colors";

const minHeight = 130;
const maxHeight = 225;
const SWIPE_THRESHOLD = (maxHeight - minHeight) / 2;

export default class ChatHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      scrollY: new Animated.Value(0)
    };

    this.panResponder = PanResponder.create({
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => {
        const { dx, dy } = gestureState;
        return Math.abs(dx) > 0.1 || Math.abs(dy) > 0.1;
      },
      onPanResponderGrant: (e, gestureState) => {
        this.state.scrollY.setOffset(this.state.scrollY._value);
        this.state.scrollY.setValue(0);
      },
      onPanResponderMove: Animated.event([null, { dy: this.state.scrollY }]),
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onPanResponderRelease: (evt, { vy }) => {
        this.state.scrollY.flattenOffset();
        this.state.scrollY.setValue(Math.min(this.state.scrollY._value, 130));
        Animated.spring(this.state.scrollY, {
          toValue: 0,
          friction: 10
        }).start();

        //Animated.decay(this.state.scrollY, {
        // toValue: gestureState.vy > 0 ? maxHeight - minHeight : 0,
        //  duration: 200
        //}).start();
      }
    });
  }

  handleInspect = () => {
    this.setState(
      prevState => {
        return {
          isOpen: !prevState.isOpen
        };
      },
      () => {
        Animated.timing(this.state.animation, {
          toValue: !this.state.isOpen ? 0 : 1,
          duration: 300
        }).start(); // Start the animation
      }
    );
  };

  normalizeValue = value => {
    return (maxHeight - minHeight) * value;
  };

  render() {
    return (
      <Animated.View
        style={{
          backgroundColor: "white",
          zIndex: 2,
          elevation: 6,
          height: this.state.scrollY.interpolate({
            inputRange: [0, 0, this.normalizeValue(1), this.normalizeValue(1)],
            outputRange: [minHeight, minHeight, maxHeight, maxHeight]
          }),
          position: "absolute",
          top: 0,
          left: 0,
          right: 0
        }}
        {...this.panResponder.panHandlers}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center"
          }}
        >
          <Button
            onPress={this.props.handleGoBack}
            style={{
              padding: 10
            }}
          >
            <Icon
              name="chevron-left"
              size={24}
              style={{ color: colors.black }}
            />
          </Button>
          <View>
            <Header2 color={"primary"}>Giovanni 6</Header2>
          </View>
        </View>
        <View style={{ flex: 1, flexDirection: "row", marginHorizontal: 15 }}>
          <Animated.View
            style={{
              position: "absolute",
              transform: [
                {
                  translateX: this.state.scrollY.interpolate({
                    inputRange: [
                      this.normalizeValue(0.2),
                      this.normalizeValue(0.2),
                      this.normalizeValue(1),
                      this.normalizeValue(1)
                    ],
                    outputRange: [66, 66, 0, 0]
                  })
                }
              ]
            }}
          >
            <Header2 color={"primary"}>Matematica Verde 3</Header2>
          </Animated.View>
          <Animated.Image
            style={{
              height: this.state.scrollY.interpolate({
                inputRange: [
                  this.normalizeValue(0.15),
                  this.normalizeValue(0.15),
                  this.normalizeValue(1),
                  this.normalizeValue(1)
                ],
                outputRange: [65, 65, 130, 130]
              }),
              width: this.state.scrollY.interpolate({
                inputRange: [
                  this.normalizeValue(0.15),
                  this.normalizeValue(0.15),
                  this.normalizeValue(1),
                  this.normalizeValue(1)
                ],
                outputRange: [61, 61, 122, 122]
              }),
              borderRadius: 4,
              transform: [
                {
                  translateY: this.state.scrollY.interpolate({
                    inputRange: [
                      0,
                      0,
                      this.normalizeValue(0.2),
                      this.normalizeValue(0.2)
                    ],
                    outputRange: [0, 0, 25, 25]
                  })
                }
              ]
            }}
            source={require("../../media/imgs/thumbnail-test.png")}
          />
          <View style={{ flex: 1, marginTop: 25, marginLeft: 5 }}>
            <Header2 color={"primary"}>EUR 15</Header2>
            <Header5 color={"secondary"}>I.I.S.S J. Von Neumann</Header5>
          </View>
        </View>
      </Animated.View>
    );
  }
}

/*
      
        <Button
          onPress={this.handleInspect}
          style={{
            position: "absolute",
            right: 0,
            bottom: 0,
            zIndex: 1,
            padding: 10
          }}
        >
          <Icon
            name={this.state.isOpen ? "chevron-up" : "chevron-down"}
            size={24}
            style={{ color: colors.black }}
          />
        </Button>

        */
