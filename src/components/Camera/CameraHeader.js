import React, { Component } from "react";
import { View, FlatList } from "react-native";
import Button from "../Button";
import colors from "../../styles/colors";
import CameraPreviews from "./CameraPreviews";
import Icon from "react-native-vector-icons/FontAwesome";

export class CameraHeader extends Component {
  render() {
    const { previews, handleGoBack } = this.props;
    return (
      <View
        style={{
          flex: 0,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          marginTop: 20
        }}
      >
        <Button onPress={handleGoBack} style={{ padding: 10 }}>
          <Icon name="chevron-left" size={30} style={{ color: "white" }} />
        </Button>
        <CameraPreviews previews={previews} />
      </View>
    );
  }
}

export default CameraHeader;
