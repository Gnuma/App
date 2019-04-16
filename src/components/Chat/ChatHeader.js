import React, { Component } from "react";
import { View, Animated, PanResponder, Dimensions } from "react-native";
import Button from "../Button";
import Icon from "react-native-vector-icons/FontAwesome";
import { Header1, Header2, Header5, Header3, Header4 } from "../Text";
import colors from "../../styles/colors";
import { CachedImage } from "react-native-cached-image";
import ConditionCircle from "../ConditionCircle";

const minHeight = 120;
const maxHeight = 280;
const deltaY = maxHeight - minHeight;

export default class ChatHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scrollY: new Animated.Value(0)
    };

    this.panResponder = PanResponder.create({
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => {
        const { dy } = gestureState;
        return Math.abs(dy) > 0.1;
      },
      onPanResponderGrant: (e, gestureState) => {
        this.state.scrollY.setOffset(this.state.scrollY._value);
      },
      onPanResponderMove: Animated.event([null, { dy: this.state.scrollY }]),
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onPanResponderRelease: (evt, { vy }) => {
        this.state.scrollY.setValue(
          Math.min(this.state.scrollY._value, deltaY)
        );
        this.state.scrollY.flattenOffset();
        Animated.spring(this.state.scrollY, {
          toValue: 0,
          friction: 10
        }).start();
      }
    });
  }

  normalizeValue = value => {
    return deltaY * value;
  };

  render() {
    const { scrollY } = this.state;
    const { book, data } = this.props;
    return (
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
          elevation: 4
        }}
        {...this.panResponder.panHandlers}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginVertical: 10,
            marginHorizontal: 6
          }}
        >
          <Button
            style={{
              padding: 6,
              marginRight: 10,
              borderRadius: 6,
              backgroundColor: colors.white
            }}
          >
            <Icon
              name="chevron-left"
              size={24}
              style={{ color: colors.black }}
            />
          </Button>
          <Header1 color="primary" style={{ flex: 1, lineHeight: 30 }}>
            {data.UserTO.username}
          </Header1>
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
          <Animated.View style={{ flexDirection: "row", top: bookTitleHeight }}>
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
                  outputRange: [imgMinWidth * imgRatio, imgMaxWidth * imgRatio],
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
                    viewportWidth - 10 - imgMinWidth,
                    viewportWidth - 10 - imgMaxWidth
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
      </Animated.View>
    );
  }
}

const contentMargin = 16;
let { width: viewportWidth, height: viewportHeight } = Dimensions.get("window");
viewportWidth -= contentMargin * 2;

const bookTitleHeight = 30;
const imgMinWidth = 60;
const imgMaxWidth = 120;
const imgRatio = 4 / 3;
