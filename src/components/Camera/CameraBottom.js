import React, { Component } from "react";
import { Text, View } from "react-native";
import Button from "../Button";
import colors from "../../styles/colors";
import Icon from "react-native-vector-icons/FontAwesome";
import { Header3 } from "../Text";
import { RNCamera } from "react-native-camera";
import { bottomBar as bottomBarStyle, generalStyle } from "./styles";

export class CameraBottom extends Component {
  render() {
    const {
      takePicture,
      changeFlashMode,
      flashMode,
      handleGoNext
    } = this.props;
    return (
      <View style={bottomBarStyle.container}>
        <View style={bottomBarStyle.leftBox}>
          <Button style={generalStyle.p10} onPress={changeFlashMode}>
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
        <View style={bottomBarStyle.middleBox}>
          <Button style={bottomBarStyle.captureBtn} onPress={takePicture} />
        </View>
        <View style={bottomBarStyle.rightBox}>
          <Button style={generalStyle.p10} onPress={handleGoNext}>
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
