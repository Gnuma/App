import React, { Component } from "react";
import { Text, View, FlatList } from "react-native";
import ChatLink from "./ChatLink";

export default class ChatsList extends Component {
  render() {
    const { sellerChatsData, buyerChatsData } = this.props;
    const data = Object.values(sellerChatsData).concat(
      Object.values(buyerChatsData)
    );
    return (
      <FlatList
        style={{ flex: 1 }}
        data={data}
        renderItem={this._renderItem}
        keyExtractor={this._keyExtractor}
      />
    );
  }

  _renderItem = ({ item }) => {
    return <ChatLink data={item} inspectChat={this.props.inspectChat} />;
  };

  _keyExtractor = item => {
    return item.id;
  };
}
