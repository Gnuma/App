import React, { Component } from "react";
import { View, Text } from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { chats } from "../mockData/Chat";
import HomeHeader from "../components/MainChat/HomeHeader";
import ChatsList from "../components/MainChat/ChatsList";
export class ChatHome extends Component {
  render() {
    const { sellerChats, buyerChats } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <HomeHeader />
        <ChatsList
          sellerChatsData={sellerChats}
          buyerChatsData={buyerChats}
          inspectChat={this.inspectChat}
        />
      </View>
    );
  }

  inspectChat = data => {
    this.props.navigation.navigate("Chat", {
      data
    });
  };
}

const mapStateToProps = state => ({
  sellerChats: state.messaging.sellerChats,
  buyerChats: state.messaging.buyerChats
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatHome);
