import React, { Component } from "react";
import {
  Text,
  View,
  FlatList,
  Image,
  Animated,
  PanResponder,
  ScrollView
} from "react-native";
import { Header2 } from "../Text";
import colors from "../../styles/colors";
import Icon from "react-native-vector-icons/FontAwesome";
import ImagePreview from "./ImagePreview";
import MovablePreview from "./MovablePreview";
import SortableList from "react-native-sortable-list";

export class CameraPreviews extends Component {
  constructor(props) {
    super(props);

    this.state = {
      draggedFocus: null
    };
  }

  render() {
    const { previews, _reorderPreviews } = this.props;
    return (
      <SortableList
        horizontal
        style={{ flex: 1, height: 80, alignItems: "center" }}
        data={previews}
        renderRow={this._renderItem}
        rowActivationTime={0}
        onChangeOrder={_reorderPreviews}
      />
    );
  }

  _renderItem = ({ data, active }) => {
    return <ImagePreview item={data} active={active} />;
  };

  _keyExtractor = (item, index) => {
    return index.toString();
  };
}

export default CameraPreviews;
