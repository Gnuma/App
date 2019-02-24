import React, { Component } from "react";
import {
  Text,
  View,
  Animated,
  Image,
  TouchableWithoutFeedback,
  PanResponder,
  Easing,
  Dimensions,
  Platform
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

export default class ImagePreview extends Component {
  constructor(props) {
    super(props);

    this._active = new Animated.Value(0);

    this._style = {
      ...Platform.select({
        ios: {
          transform: [
            {
              scale: this._active.interpolate({
                inputRange: [0, 1],
                outputRange: [1, 1.1]
              })
            }
          ],
          shadowRadius: this._active.interpolate({
            inputRange: [0, 1],
            outputRange: [2, 10]
          })
        },

        android: {
          transform: [
            {
              scale: this._active.interpolate({
                inputRange: [0, 1],
                outputRange: [1, 1.07]
              })
            }
          ],
          elevation: this._active.interpolate({
            inputRange: [0, 1],
            outputRange: [2, 6]
          })
        }
      })
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.active !== nextProps.active) {
      Animated.timing(this._active, {
        duration: 300,
        easing: Easing.bounce,
        toValue: Number(nextProps.active)
      }).start();
    }
  }

  render() {
    const { item } = this.props;
    if (item)
      return (
        <Animated.View
          style={[
            {
              borderRadius: 4,
              marginHorizontal: 6,
              elevation: 4,
              borderColor: "white",
              borderWidth: 2,
              marginTop: 5
            },
            this._style
          ]}
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
    else
      return (
        <View
          style={{
            height: 74,
            width: 56,
            borderWidth: 2,
            borderColor: "white",
            justifyContent: "center",
            alignItems: "center",
            marginHorizontal: 6,
            borderRadius: 4,
            marginTop: 5
          }}
        >
          <Icon name="camera" size={20} style={{ color: "white" }} />
        </View>
      );
  }
}
