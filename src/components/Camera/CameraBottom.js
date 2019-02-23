import React, { Component } from "react";
import { Text, View } from "react-native";
import Button from "../Button";
import colors from "../../styles/colors";

export class CameraBottom extends Component {
  render() {
    const { takePicture } = this.props;
    return (
      <View
        style={{
          flex: 0,
          flexDirection: "row",
          justifyContent: "center",
          marginBottom: 35
        }}
      >
        <Button
          style={{
            width: 60,
            height: 60,
            borderRadius: 30,
            backgroundColor: colors.secondary
          }}
          onPress={takePicture}
        />
      </View>
    );
  }
}

export default CameraBottom;
