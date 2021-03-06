import React, { Component } from "react";
import { Text, View, Animated, StyleSheet } from "react-native";
import Button from "../Button";
import { Header2, Header3 } from "../Text";
import colors from "../../styles/colors";
import FullButton from "../FullButton";

export class ContactButton extends Component {
  height = 0;

  render() {
    const {
      scrollY,
      viewHeight,
      setContactButtonHeight,
      contactSnapY,
      isOwner
    } = this.props;
    console.log(contactSnapY);
    return (
      <Animated.View
        style={{
          position: "absolute",
          flexDirection: "row",
          top: viewHeight - this.height,
          transform: [
            {
              translateY: scrollY.interpolate({
                inputRange: [
                  0,
                  Math.abs(contactSnapY - viewHeight + this.height)
                ],
                outputRange: [
                  0,
                  Math.abs(contactSnapY - viewHeight + this.height)
                ],
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
        <View
          style={{
            flex: 1,
            paddingVertical: 10,
            paddingHorizontal: 35,
            backgroundColor: colors.white
          }}
        >
          <FullButton
            value={isOwner ? "Modifica Vendita" : "Contatta Ora"}
            icon={isOwner ? "pen" : "send"}
            contentStyle={{ flex: 1, textAlign: "center" }}
            onPress={this.props.onContact}
          />
        </View>
      </Animated.View>
    );
  }
}

export default ContactButton;

const styles = StyleSheet.create({
  contactButton: {
    flex: 1,
    backgroundColor: colors.secondary,
    elevation: 1,
    flexDirection: "row",
    padding: 8,
    justifyContent: "center",
    borderRadius: 6
  },
  modifyButton: {
    flex: 1,
    backgroundColor: colors.white,
    elevation: 3,
    flexDirection: "row",
    padding: 8,
    justifyContent: "center",
    borderRadius: 6
  }
});
