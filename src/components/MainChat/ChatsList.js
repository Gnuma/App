import React, { Component } from "react";
import { Text, View, FlatList } from "react-native";
import ChatLink from "./ChatLink";

export default class ChatsList extends Component {
  render() {
    const { chats } = this.props;
    console.log(chats);
    return (
      <FlatList
        style={{ flex: 1 }}
        data={chats}
        renderItem={this._renderItem}
        keyExtractor={this._keyExtractor}
      />
    );
  }

  _renderItem = item => {
    return <ChatLink />;
  };

  _keyExtractor = item => {
    return item.id;
  };
}
