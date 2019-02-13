import React, { Component } from "react";
import { View, FlatList, Text, SectionList } from "react-native";
import PropTypes from "prop-types";
import styles from "./styles";
import ListMultiItem from "../ListItem/ListMultiItem";
import ListSingleItem from "../ListItem/ListSingleItem";

export class MainList extends Component {
  static propTypes = {
    data: PropTypes.array
  };

  render() {
    const { data, isSingle } = this.props;
    return (
      <View style={{ flex: 1 }}>
        {isSingle ? (
          <View style={{ flex: 1 }}>
            <FlatList
              style={{ flex: 1 }}
              data={data}
              renderItem={({ item }) => <ListSingleItem data={item} />}
              keyExtractor={this._keyExtractor}
            />
          </View>
        ) : (
          <FlatList
            style={{ flex: 1 }}
            data={data}
            renderItem={({ item }) => <ListMultiItem data={item} />}
            keyExtractor={this._keyExtractor}
          />
        )}
      </View>
    );
  }

  _keyExtractor = item => {
    return item.id;
  };
}

export default MainList;
