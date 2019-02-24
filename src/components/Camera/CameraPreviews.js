import React, { Component } from "react";
import {
  Text,
  View,
  FlatList,
  Image,
  Animated,
  PanResponder
} from "react-native";
import { Header2 } from "../Text";
import colors from "../../styles/colors";
import Icon from "react-native-vector-icons/FontAwesome";
import ImagePreview from "./ImagePreview";
import MovablePreview from "./MovablePreview";

export class CameraPreviews extends Component {
  constructor(props) {
    super(props);

    this.state = {
      draggedFocus: null
    };
  }

  render() {
    const isDragging = this.state.draggedFocus !== null;
    const { previews } = this.props;
    return (
      <View
        style={{
          flex: 1,
          overflow: "visible"
        }}
      >
        <FlatList
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

        {isDragging ? (
          <MovablePreview
            item={this.state.draggedFocus}
            setDragging={this.setDragging}
          />
        ) : null}
      </View>
    );
  }

  setDragging = (item, view) => {
    if (item === null) {
      this.setState({
        draggedFocus: null
      });
    } else {
      console.log(view);
      this.setState({
        draggedFocus: {
          item: item,
          fx: view.pressInLocation.locationX,
          fy: view.pressInLocation.locationY
        }
      });
    }
  };

  _renderItem = ({ item, index }) => {
    if (item)
      return (
        <ImagePreview
          item={item}
          index={index}
          draggedFocus={this.state.draggedFocus}
          setDragging={this.setDragging}
        />
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
