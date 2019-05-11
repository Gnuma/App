import React, { Component } from "react";
import { View, Text } from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import ChatHeader from "../components/Chat/ChatHeader";
import ChatView from "../components/Chat/Chat";
import { single } from "../mockData/Chat2";
import * as salesActions from "../store/actions/sales";
import * as shoppingActions from "../store/actions/shopping";
import * as messagingAction from "../store/actions/messaging";
import ContactReview from "../components/Chat/ContactReview";
import { ChatType } from "../utils/constants";

export class Chat extends Component {
  constructor(props) {
    super(props);

    const itemID = props.navigation.getParam("itemID", null);
    const subjectID = props.navigation.getParam("subjectID", null);
    const chatID = props.navigation.getParam("chatID", null);

    this.type = itemID !== null ? ChatType.sales : ChatType.shopping;

    this.state = {
      objectID: this.type === ChatType.sales ? itemID : subjectID,
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
    if (this.type === ChatType.sales) {
      this.props.salesSetChatFocus(chatID);
    } else {
      this.props.shoppingSetChatFocus(chatID);
    }
  };

  goBookOffert = () => {
    this.props.navigation.navigate("BookOffert", {
      objectID: this.state.objectID,
      chatID: this.state.chatID,
      type: this.type
    });
  };

  getData = () => {
    if (this.type === ChatType.sales) {
      return this.props.salesData;
    } else {
      return this.props.shoppingData;
    }
  };

  getChatData = () => {
    return this.getData()[this.state.objectID].chats[this.state.chatID];
  };

  setComposer = (objectID, chatID, composerValue) => {
    if (this.type === ChatType.sales) {
      this.props.salesSetComposer(objectID, chatID, composerValue);
    } else {
      this.props.shoppingSetComposer(objectID, chatID, composerValue);
    }
  };

  sendMsg = (objectID, chatID) => {
    /*if (this.type === ChatType.sales) {
      this.props.salesSend(objectID, chatID);
    } else {
      this.props.shoppingSend(objectID, chatID);
    }*/
    this.props.sendMessage(this.type, objectID, chatID);
  };

  readChat = (objectID, chatID) => {
    if (this.type === ChatType.sales) {
      this.props.salesRead(objectID, chatID);
    } else {
      this.props.shoppingRead(objectID, chatID);
    }
  };

  getItem = () => {
    if (this.type === ChatType.sales) {
      return this.getData()[this.state.objectID];
    } else {
      return this.getData()[this.state.objectID].chats[this.state.chatID].item;
    }
  };

  getGlobalLoading = () => {
    if (this.type === ChatType.sales) {
      return this.props.salesLoading;
    } else {
      return this.props.shoppingLoading;
    }
  };

  loadEarlier = () => {
    if (this.type === ChatType.sales) {
      return this.props.salesLoadEarlier(
        this.state.objectID,
        this.state.chatID
      );
    } else {
      return this.props.shoppingLoadEarlier(
        this.state.objectID,
        this.state.chatID
      );
    }
  };

  render() {
    const { objectID, chatID } = this.state;
    const chatData = this.getChatData();
    const item = this.getItem();
    console.log(this.getGlobalLoading());

    return (
      <View style={{ flex: 1 }}>
        <ChatHeader
          data={chatData}
          book={item.book}
          goBack={this._goBack}
          goBookOffert={this.goBookOffert}
        />
        <View style={{ flex: 1, marginTop: 120 }}>
          {chatData.status === "local" ||
          (chatData.status === "pending" && this.type === ChatType.sales) ? (
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
              globalLoading={this.getGlobalLoading()}
              salesSend={this.sendMsg}
              salesSetComposer={this.setComposer}
              salesRead={this.readChat}
              type={this.type}
              loadEarlier={this.loadEarlier}
              userID={this.props.userID}
              item={item}
              goBookOffert={this.goBookOffert}
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
  shoppingData: state.shopping.data,
  salesLoading: state.sales.loading,
  shoppingLoading: state.shopping.loading,
  userID: state.auth.id
});

const mapDispatchToProps = dispatch => ({
  salesSend: (itemID, chatID) =>
    dispatch(salesActions.salesSend(itemID, chatID)),
  shoppingSend: (subjectID, chatID) =>
    dispatch(shoppingActions.shoppingSend(subjectID, chatID)),
  sendMessage: (type, objectID, chatID) =>
    dispatch(messagingAction.sendMessage(type, objectID, chatID)),

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
  salesSetChatFocus: chatID => dispatch(salesActions.salesSetChatFocus(chatID)),
  shoppingLoadEarlier: (subjectID, chatID) =>
    dispatch(shoppingActions.shoppingLoadEarlier(subjectID, chatID)),
  salesLoadEarlier: (itemID, chatID) =>
    dispatch(salesActions.salesLoadEarlier(itemID, chatID))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Chat);
