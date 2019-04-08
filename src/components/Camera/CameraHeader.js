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
      previewsOrder,
      handleGoNext
    } = this.props;

    return (
      <View style={headerStyle.container}>
        <View style={{ width: 50 }}>
          <Button onPress={handleGoBack} style={generalStyle.p10}>
            <Icon name="chevron-left" size={30} style={generalStyle.w} />
          </Button>
        </View>
        <View style={{ flex: 1 }}>
          <CameraPreviews
            previews={previews}
            _reorderPreviews={_reorderPreviews}
            deleteItem={deleteItem}
            previewsOrder={previewsOrder}
          />
        </View>
        <View style={{ width: 50 }}>
          <Button style={generalStyle.p10} onPress={handleGoNext}>
            <Icon
              name="arrow-circle-right"
              size={30}
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

export default CameraHeader;
