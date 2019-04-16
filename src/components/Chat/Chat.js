import React, { Component } from "react";
import { View, Text, TextInput, KeyboardAvoidingView } from "react-native";
import PropTypes from "prop-types";
import { Header2, Header4, Header5 } from "../Text";
import Icon from "react-native-vector-icons/FontAwesome";
import {
  GiftedChat,
  Bubble,
  Time,
  InputToolbar
} from "react-native-gifted-chat";
import colors from "../../styles/colors";
import Button from "../Button";
import Composer from "./Composer";

export default class Chat extends Component {
  onSend = () => {
    this.props.salesSend(this.props.itemID, this.props.chatID);
  };

  onComposerTextChanged = text => {
    this.props.salesSetComposer(this.props.itemID, this.props.chatID, text);
  };

  renderBubble = props => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: colors.primary,
            elevation: 1
          },
          left: {
            elevation: 1,
            backgroundColor: colors.white
          }
        }}
      />
    );
  };

  renderTime = props => {
    const { currentMessage } = props;
    if (currentMessage.isSending)
      return (
        <Header5
          style={{
            color: props.position === "left" ? colors.grey : colors.white,
            justifyContent: "center",
            textAlign: "center",
            paddingHorizontal: 15,
            lineHeight: 11
          }}
        >
          Inviando...
        </Header5>
      );
    else return <Time {...props} />;
  };

  render() {
    const { data: dataRedux, itemID, chatID } = this.props;
    //console.log(dataRedux, itemID, chatID);
    const data = dataRedux[itemID].chats[chatID];

    return (
      <View style={{ flex: 1 }}>
        <GiftedChat
          messages={data.messages}
          renderAvatar={null}
          user={{
            _id: 1 // sent messages should have same user._id
          }}
          renderBubble={this.renderBubble}
          renderTime={this.renderTime}
          renderInputToolbar={this.renderNull}
          renderComposer={this.renderNull}
          minInputToolbarHeight={0}
          maxComposerHeight={0}
        />
        <Composer
          onSend={this.onSend}
          onComposerTextChanged={this.onComposerTextChanged}
          text={data.composer}
        />
      </View>
    );
  }
  renderNull = () => null;
}

/*
    return (
      <InputToolbar
        {...props}
        containerStyle={{
          borderTopWidth: 0,
          minHeight: 60
        }}
        primaryStyle={{
          marginHorizontal: 15,
          marginTop: 4,
          marginBottom: 7,
          borderRadius: 6,
          backgroundColor: colors.white,
          elevation: 2
        }}
      />
    );*/
