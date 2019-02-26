import React, { Component } from "react";
import { View, Text } from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { chats } from "../mockData/Chat";
import HomeHeader from "../components/MainChat/HomeHeader";
import ChatsList from "../components/MainChat/ChatsList";

export class ChatHome extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <HomeHeader />
        <ChatsList chats={chats} />
      </View>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatHome);
