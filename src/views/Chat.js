import React, { Component } from "react";
import { View, Text } from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import ChatHeader from "../components/Chat/ChatHeader";
import ChatView from "../components/Chat/Chat";
import { single } from "../mockData/Chat2";
import * as salesActions from "../store/actions/sales";
import ContactReview from "../components/Chat/ContactReview";

export class Chat extends Component {
  constructor(props) {
    super(props);

    this.state = {
      itemID: props.navigation.getParam("itemID", null),
      chatID: props.navigation.getParam("chatID", null)
    };
  }

  static propTypes = {};

  componentDidMount() {
    this.props.salesRead(this.state.itemID, this.state.chatID);
  }

  render() {
    const { itemID, chatID } = this.state;
    const { data, salesSend, salesSetComposer, salesRead } = this.props;

    return (
      <View style={{ flex: 1 }}>
        <ChatHeader
          data={data[itemID].chats[chatID]}
          book={data[itemID].book}
        />
        <View style={{ flex: 1, marginTop: 120 }}>
          {data[itemID].chats[chatID].status === "pending" ||
          data[itemID].chats[chatID].status === "loadingDecision" ? (
            <ContactReview
              itemID={itemID}
              chatID={chatID}
              status={data[itemID].chats[chatID].status}
              onSettle={this.props.salesSettle}
              username={data[itemID].chats[chatID].UserTO.username}
            />
          ) : (
            <ChatView
              itemID={itemID}
              chatID={chatID}
              data={data}
              salesSend={salesSend}
              salesSetComposer={salesSetComposer}
              salesRead={salesRead}
            />
          )}
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  data: state.sales.data
});

const mapDispatchToProps = dispatch => ({
  salesSend: (itemID, chatID) =>
    dispatch(salesActions.salesSend(itemID, chatID)),
  salesSetComposer: (itemID, chatID, composerValue) =>
    dispatch(salesActions.salesSetComposer(itemID, chatID, composerValue)),
  salesRead: (itemID, chatID) =>
    dispatch(salesActions.salesRead(itemID, chatID)),
  salesSettle: (itemID, chatID, isAccepting) =>
    dispatch(salesActions.salesSettle(itemID, chatID, isAccepting))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Chat);
