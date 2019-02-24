import React, { Component } from "react";
import { Text, View } from "react-native";
import ImagePreview from "./ImagePreview";
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
