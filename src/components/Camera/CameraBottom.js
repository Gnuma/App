import React, { Component } from "react";
import { Text, View } from "react-native";
import Button from "../Button";
import colors from "../../styles/colors";
import Icon from "react-native-vector-icons/FontAwesome";
import { Header3 } from "../Text";
import { RNCamera } from "react-native-camera";

export class CameraBottom extends Component {
  render() {
    const {
      takePicture,
      changeFlashMode,
      flashMode,
      handleGoNext
    } = this.props;
    return (
      <View
        style={{
          flex: 0,
          flexDirection: "row",
          justifyContent: "center",
          marginBottom: 35
        }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "flex-end",
            flexDirection: "row",
            alignItems: "center"
          }}
        >
          <Button style={{ padding: 10 }} onPress={changeFlashMode}>
            <Icon
              name="bolt"
              size={30}
              style={{
                color:
                  flashMode === RNCamera.Constants.FlashMode.off
                    ? "gray"
                    : "white"
              }}
            />
          </Button>
        </View>
        <View
          style={{ flex: 1, justifyContent: "center", flexDirection: "row" }}
        >
          <Button
            style={{
              width: 60,
              height: 60,
              borderRadius: 30,
              backgroundColor: "white"
            }}
            onPress={takePicture}
          />
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            flexDirection: "row",
            alignItems: "center"
          }}
        >
          <Button
            style={{
              padding: 10
            }}
            onPress={handleGoNext}
          >
            <Icon
              name="arrow-circle-right"
              size={40}
              style={{
                color: colors.secondary
              }}
            />
          </Button>
        </View>
      </View>
    );
  }
}

export default CameraBottom;
