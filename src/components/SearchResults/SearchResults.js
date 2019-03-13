import React, { Component } from "react";
import { View, FlatList } from "react-native";
import { Header3 } from "../Text";
import Button from "../Button";
import PropTypes from "prop-types";
import styles from "./styles";

export class SearchResults extends Component {
  render() {
    const { suggestions, searchRedux } = this.props;
    return (
      <FlatList
        style={{ flex: 1 }}
        keyboardShouldPersistTaps={"handled"}
        data={suggestions}
        renderItem={({ item }) => {
          return (
            <Button
              style={{ padding: 10, flexDriection: "row" }}
              onPress={() => searchRedux(item)}
            >
              <Header3>{item.title}</Header3>
            </Button>
          );
        }}
        keyExtractor={this._keyExtractor}
        contentContainerStyle={{
          justifyContent: "center",
          alignItems: "center"
        }}
      />
    );
  }

  _keyExtractor = (item, index) => {
    return index.toString();
  };
}

export default SearchResults;
