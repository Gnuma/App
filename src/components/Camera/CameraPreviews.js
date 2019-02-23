import React, { Component } from "react";
import { Text, View, FlatList, Image } from "react-native";
import { Header2 } from "../Text";
import colors from "../../styles/colors";
import Icon from "react-native-vector-icons/FontAwesome";

export class CameraPreviews extends Component {
  render() {
    const { previews } = this.props;
    return (
      <FlatList
        style={{
          flex: 1
        }}
        data={previews}
        renderItem={this._renderItem}
        keyExtractor={this._keyExtractor}
        horizontal={true}
        contentContainerStyle={{
          justifyContent: "center",
          flex: 1,
          flexDirection: "row"
        }}
      />
    );
  }

  _renderItem = ({ item, index }) => {
    if (item)
      return (
        <View
          style={{
            borderRadius: 4,
            overflow: "hidden",
            marginHorizontal: 6,
            elevation: 4,
            borderColor: index === 0 ? colors.secondary : "white",
            borderWidth: 2
          }}
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
        </View>
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
            borderRadius: 4
          }}
        >
          <Icon name="camera" size={20} style={{ color: "white" }} />
        </View>
      );
  };

  _keyExtractor = (item, index) => {
    return index.toString();
  };
}

export default CameraPreviews;
