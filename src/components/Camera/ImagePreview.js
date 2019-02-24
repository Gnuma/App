import React, { Component } from "react";
import {
  Text,
  View,
  Animated,
  Image,
  TouchableWithoutFeedback,
  PanResponder
} from "react-native";

export default class ImagePreview extends Component {
  constructor(props) {
    super(props);

    this.state = {
      initAni: new Animated.Value(0)
    };
  }

  componentDidMount() {
    Animated.timing(this.state.initAni, {
      toValue: 1,
      duration: 200
    }).start();
  }

  render() {
    const { item, index, draggedFocus, setDragging } = this.props;
    const isDragged = draggedFocus === item;
    return (
      <TouchableWithoutFeedback
        onPressIn={() => setDragging(item, this.view)}
        ref={view => {
          this.view = view;
        }}
      >
        <Animated.View
          style={[
            {
              borderRadius: 4,
              overflow: "hidden",
              marginHorizontal: 6,
              elevation: 4,
              borderColor: isDragged ? "red" : "white",
              borderWidth: 2
            },
            {
              transform: [{ scale: this.state.initAni }]
            }
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
      </TouchableWithoutFeedback>
    );
  }
}
