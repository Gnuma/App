import React, { Component } from "react";
import { View, FlatList } from "react-native";
import Button from "../Button";
import colors from "../../styles/colors";
import CameraPreviews from "./CameraPreviews";
import Icon from "react-native-vector-icons/FontAwesome";
import { header as headerStyle, generalStyle } from "./styles";

export class CameraHeader extends Component {
  render() {
    const {
      previews,
      handleGoBack,
      _reorderPreviews,
      deleteItem,
      previewsOrder
    } = this.props;
    return (
      <View style={headerStyle.container}>
        <Button onPress={handleGoBack} style={generalStyle.p10}>
          <Icon name="chevron-left" size={30} style={generalStyle.w} />
        </Button>
        <CameraPreviews
          previews={previews}
          _reorderPreviews={_reorderPreviews}
          deleteItem={deleteItem}
          previewsOrder={previewsOrder}
        />
      </View>
    );
  }
}

export default CameraHeader;
