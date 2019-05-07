import React, { Component } from "react";
import { Text, View, Animated } from "react-native";
import Button from "../Button";
import { Header2 } from "../Text";

export class ContactButton extends Component {
  height = 0;

  render() {
    const {
      scrollY,
      viewHeight,
      setContactButtonHeight,
      contactSnapY
    } = this.props;
    console.log(contactSnapY);
    return (
      <Animated.View
        style={{
          position: "absolute",
          top: viewHeight - this.height,
          alignSelf: "center",
          transform: [
            {
              translateY: scrollY.interpolate({
                inputRange: [0, contactSnapY - viewHeight + this.height + 5],
                outputRange: [0, contactSnapY - viewHeight + this.height + 5],
                extrapolate: "clamp"
              })
            }
          ]
        }}
        onLayout={event => {
          this.height = event.nativeEvent.layout.height;
          setContactButtonHeight(this.height);
        }}
      >
        <Button
          style={{
            backgroundColor: "white",
            elevation: 4,
            flexDirection: "row",
            padding: 10,
            justifyContent: "center",
            borderRadius: 8,
            marginBottom: 10
          }}
          onPress={this.props.onContact}
        >
          <Header2 color={"secondary"}>Contatta Ora</Header2>
        </Button>
      </Animated.View>
    );
  }
}

export default ContactButton;
