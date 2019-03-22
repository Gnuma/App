import React, { Component } from "react";
import { Text, View, FlatList } from "react-native";
import BookItem from "./BookItem";

export default class SelectBookList extends Component {
  render() {
    const { results } = this.props;
    return (
      <FlatList
        style={{ flex: 1 }}
        data={results}
        renderItem={this._renderItem}
        keyExtractor={this._keyExtractor}
        keyboardShouldPersistTaps={"handled"}
      />
    );
  }

  _keyExtractor = item => {
    return item.isbn;
  };

  _renderItem = ({ item }) => {
    return (
      <BookItem data={item} handleSelection={this.props.handleSelection} />
    );
  };
}
