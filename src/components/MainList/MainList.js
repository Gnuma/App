import React, { Component } from "react";
import { View, FlatList, Text } from "react-native";
import PropTypes from "prop-types";
import styles from "./styles";
import ListItem from "../ListItem/ListItem";

export class MainList extends Component {
  static propTypes = {
    data: PropTypes.array
  };

  render() {
    const { data } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <FlatList
          style={{ flex: 1 }}
          data={data}
          renderItem={({ item }) => <ListItem data={item} />}
          keyExtractor={this._keyExtractor}
        />
      </View>
    );
  }

  _keyExtractor = (item, index) => {
    return item.id;
  };
}

export default MainList;
