import React, { Component } from "react";
import { View, Animated, PanResponder, Dimensions } from "react-native";
import Button from "../Button";
import Icon from "react-native-vector-icons/FontAwesome";
import { Header1, Header2, Header5, Header3, Header4 } from "../Text";
import colors from "../../styles/colors";
import { CachedImage } from "react-native-cached-image";
import ConditionCircle from "../ConditionCircle";
import {
  Svg,
  Defs,
  LinearGradient,
  Stop,
  Ellipse,
  Rect
} from "react-native-svg";
import FullButton from "../FullButton";
import SolidButton from "../SolidButton";
import {
  TouchableNativeFeedback,
  PanGestureHandler,
  State
} from "react-native-gesture-handler";

const minHeight = 120;
const maxHeight = 280;
const deltaY = maxHeight - minHeight;

export default class ChatHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scrollY: new Animated.Value(0)
    };

    this.onPanGestureEvent = Animated.event([
      { nativeEvent: { translationY: this.state.scrollY } }
    ]);

    this.onHandlerStateChange = event => {
      if (
        event.nativeEvent.state === State.END ||
        event.nativeEvent.state === State.CANCELLED
      ) {
        Animated.spring(this.state.scrollY, {
          toValue: 0,
          friction: 10
        }).start();
      }
    };
  }

  normalizeValue = value => {
    return deltaY * value;
  };

  render() {
    const { scrollY } = this.state;
    const { book, data, goBookOffert } = this.props;
    return (
      <PanGestureHandler
        onHandlerStateChange={this.onHandlerStateChange}
        onGestureEvent={this.onPanGestureEvent}
      >
        <Animated.View
          style={{
            position: "absolute",
            zIndex: 1,
            overflow: "hidden",
            backgroundColor: colors.white,
            height: scrollY.interpolate({
              inputRange: [0, deltaY],
              outputRange: [minHeight, maxHeight],
              extrapolate: "clamp"
            }),
            elevation: 4,
            width: viewportWidth + 2
          }}
        >
          <View
            style={{
              flexDirection: "row",
              margin: 6,
              alignContent: "center"
            }}
          >
            <View
              style={{ flexDirection: "row", flex: 1, alignContent: "center" }}
            >
              <Button
                style={{
                  padding: 6,
                  marginRight: 10,
                  borderRadius: 6,
                  backgroundColor: colors.white
                }}
                onPress={this.props.goBack}
              >
                <Icon
                  name="chevron-left"
                  size={24}
                  style={{ color: colors.black }}
                />
              </Button>
              <Header1
                color="primary"
                numberOfLines={1}
                style={{ flex: 1, marginRight: 8 }}
              >
                {data.UserTO.username}
              </Header1>
            </View>
            <FullButton
              value="Fai una offerta"
              onPress={goBookOffert}
              style={{ paddingVertical: 6 }}
            />
          </View>
          <View style={{ marginHorizontal: contentMargin }}>
            <Animated.View
              style={{
                position: "absolute",
                transform: [
                  {
                    translateX: scrollY.interpolate({
                      inputRange: [deltaY / 3, deltaY],
                      outputRange: [imgMinWidth + 10, 0],
                      extrapolate: "clamp"
                    })
                  }
                ]
              }}
            >
              <Header2 color="primary">{book.title}</Header2>
            </Animated.View>
            <Animated.View
              style={{ flexDirection: "row", top: bookTitleHeight }}
            >
              <Animated.View
                style={{
                  overflow: "hidden",
                  backgroundColor: colors.white,
                  borderRadius: 6,
                  width: scrollY.interpolate({
                    inputRange: [0, deltaY],
                    outputRange: [imgMinWidth, imgMaxWidth],
                    extrapolate: "clamp"
                  }),
                  height: scrollY.interpolate({
                    inputRange: [0, deltaY],
                    outputRange: [
                      imgMinWidth * imgRatio,
                      imgMaxWidth * imgRatio
                    ],
                    extrapolate: "clamp"
                  }),
                  transform: [
                    {
                      translateY: scrollY.interpolate({
                        inputRange: [0, deltaY / 3],
                        outputRange: [-bookTitleHeight, 0],
                        extrapolate: "clamp"
                      })
                    }
                  ]
                }}
              >
                <CachedImage
                  style={{ flex: 1 }}
                  resizeMode="cover"
                  source={require("../../media/imgs/thumbnail-test.png")}
                />
              </Animated.View>
              <Animated.View
                style={{
                  marginHorizontal: 10,
                  width: scrollY.interpolate({
                    inputRange: [0, deltaY],
                    outputRange: [
                      containerWidth - 10 - imgMinWidth,
                      containerWidth - 10 - imgMaxWidth
                    ],
                    extrapolate: "clamp"
                  })
                }}
              >
                <View style={{ flexDirection: "row" }}>
                  <View style={{ flex: 1, marginRight: 5 }}>
                    <Header2 color="primary">EUR 15</Header2>
                    <Header3 color="secondary" numberOfLines={1}>
                      J Von Neumann
                    </Header3>
                    <Header4 color="secondary" numberOfLines={2}>
                      Via Pollenza 1441
                    </Header4>
                  </View>
                  <View>
                    <ConditionCircle conditions={0} radius={40} />
                  </View>
                </View>
                <View>
                  <Header4 color="black">ISBN</Header4>
                  <Header4 color="black">Materia</Header4>
                  <Header4 color="black">Istituto</Header4>
                </View>
              </Animated.View>
            </Animated.View>
          </View>
          <BottomShadow />
        </Animated.View>
      </PanGestureHandler>
    );
  }
}

const contentMargin = 16;
let { width: viewportWidth, height: viewportHeight } = Dimensions.get("window");
const containerWidth = viewportWidth - contentMargin * 2;

const bookTitleHeight = 30;
const imgMinWidth = 60;
const imgMaxWidth = 120;
const imgRatio = 4 / 3;

const BottomShadow = props => {
  return (
    <Svg
      height={50}
      width={viewportWidth + 2}
      style={{ position: "absolute", bottom: 0, zIndex: 1 }}
      pointerEvents={"none"}
    >
      <Defs>
        <LinearGradient id="grad" x1="0" y1="0" x2="0" y2={50}>
          <Stop offset="0" stopColor="rgb(255,255,0)" stopOpacity="0" />
          <Stop offset="1" stopColor="rgba(0, 0, 0)" stopOpacity="0.4" />
        </LinearGradient>
      </Defs>
      <Rect x="-1" y="1" width={viewportWidth} height={50} fill="url(#grad)" />
    </Svg>
  );
};
