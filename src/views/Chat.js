import React, { Component } from "react";
import { View, Text } from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import ChatHeader from "../components/Chat/ChatHeader";
import ChatView from "../components/Chat/Chat";
import { single } from "../mockData/Chat2";
import * as salesActions from "../store/actions/sales";
import * as shoppingActions from "../store/actions/shopping";
import ContactReview from "../components/Chat/ContactReview";

const sale = "sale";
const shopping = "shopping";

export class Chat extends Component {
  constructor(props) {
    super(props);

    const itemID = props.navigation.getParam("itemID", null);
    const subjectID = props.navigation.getParam("subjectID", null);
    const chatID = props.navigation.getParam("chatID", null);

    this.type = itemID !== null ? sale : shopping;

    this.state = {
      objectID: this.type === sale ? itemID : subjectID,
      chatID
    };
  }

  static propTypes = {};

  componentDidMount() {
    this.readChat(this.state.objectID, this.state.chatID);
    const { navigation } = this.props;
    this.setChatFocus(true);
    this.focusListeners = [
      navigation.addListener("didFocus", () => this.setChatFocus(true)),
      navigation.addListener("didBlur", () => this.setChatFocus(false))
    ];
  }

  componentWillUnmount() {
    this.focusListeners.forEach(element => {
      element.remove();
    });
    this.setChatFocus(false);
  }

  setChatFocus = isFocused => {
    const chatID = isFocused ? this.state.chatID : null;
    if (this.type === sale) {
      this.props.salesSetChatFocus(chatID);
    } else {
      this.props.shoppingSetChatFocus(chatID);
    }
  };

  getData = () => {
    if (this.type === sale) {
      return this.props.salesData;
    } else {
      return this.props.shoppingData;
    }
  };

  getChatData = () => {
    return this.getData()[this.state.objectID].chats[this.state.chatID];
  };

  setComposer = (objectID, chatID, composerValue) => {
    if (this.type === sale) {
      this.props.salesSetComposer(objectID, chatID, composerValue);
    } else {
      this.props.shoppingSetComposer(objectID, chatID, composerValue);
    }
  };

  sendMsg = (objectID, chatID) => {
    if (this.type === sale) {
      this.props.salesSend(objectID, chatID);
    } else {
      this.props.shoppingSend(objectID, chatID);
    }
  };

  readChat = (objectID, chatID) => {
    if (this.type === sale) {
      this.props.salesRead(objectID, chatID);
    } else {
      this.props.shoppingRead(objectID, chatID);
    }
  };

  getBook = () => {
    if (this.type === sale) {
      return this.getData()[this.state.objectID].book;
    } else {
      return this.getData()[this.state.objectID].chats[this.state.chatID].item
        .book;
    }
  };

  render() {
    const { objectID, chatID } = this.state;
    const chatData = this.getChatData();

    return (
      <View style={{ flex: 1 }}>
        <ChatHeader
          data={chatData}
          book={this.getBook()}
          goBack={this._goBack}
        />
        <View style={{ flex: 1, marginTop: 120 }}>
          {chatData.status === "local" ||
          (chatData.status === "pending" && this.type === sale) ? (
            <ContactReview
              objectID={objectID}
              chatID={chatID}
              status={chatData.status}
              isLoading={chatData.loading}
              onSettle={this.props.salesSettle}
              onContactRequest={this.props.shoppingRequestContact}
              username={chatData.UserTO.username}
              type={this.type}
            />
          ) : (
            <ChatView
              objectID={objectID}
              chatID={chatID}
              data={chatData}
              salesSend={this.sendMsg}
              salesSetComposer={this.setComposer}
              salesRead={this.readChat}
              type={this.type}
            />
          )}
        </View>
      </View>
    );
  }

  _goBack = () => {
    this.props.navigation.goBack(null);
  };
}

const mapStateToProps = state => ({
  salesData: state.sales.data,
  shoppingData: state.shopping.data
});

const mapDispatchToProps = dispatch => ({
  salesSend: (itemID, chatID) =>
    dispatch(salesActions.salesSend(itemID, chatID)),
  shoppingSend: (subjectID, chatID) =>
    dispatch(shoppingActions.shoppingSend(subjectID, chatID)),
  salesSetComposer: (itemID, chatID, composerValue) =>
    dispatch(salesActions.salesSetComposer(itemID, chatID, composerValue)),
  shoppingSetComposer: (subjectID, chatID, composerValue) =>
    dispatch(
      shoppingActions.shoppingSetComposer(subjectID, chatID, composerValue)
    ),
  salesRead: (itemID, chatID) =>
    dispatch(salesActions.salesRead(itemID, chatID)),
  shoppingRead: (subjectID, chatID) =>
    dispatch(shoppingActions.shoppingRead(subjectID, chatID)),
  salesSettle: (itemID, chatID, isAccepting) =>
    dispatch(salesActions.salesSettle(itemID, chatID, isAccepting)),
  shoppingRequestContact: (subjectID, chatID) =>
    dispatch(shoppingActions.shoppingRequestContact(subjectID, chatID)),
  shoppingSetChatFocus: chatID =>
    dispatch(shoppingActions.shoppingSetChatFocus(chatID)),
  salesSetChatFocus: chatID => dispatch(salesActions.salesSetChatFocus(chatID))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Chat);
