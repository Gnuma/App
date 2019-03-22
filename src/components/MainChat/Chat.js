import React, { Component } from "react";
import { Text, View, TextInput } from "react-native";
import firebase from "react-native-firebase";
import {
  GiftedChat,
  Send,
  InputToolbar,
  Composer
} from "react-native-gifted-chat";
import { Header3, Header4 } from "../Text";
import Icon from "react-native-vector-icons/FontAwesome";
import Button from "../Button";
import ChatComposer from "./ChatComposer";
import GnumaChat from "./GnumaChat";
import { mockMessages } from "../../mockData/Chat";

export default class Chat extends Component {
  state = {
    messages: this.props.messages
  };

  render() {
    return <View style={{ flex: 1, marginTop: 130 }}>{this.getContent()}</View>;
  }

  onSend = (messages = "") => {
    if (messages.length > 0) {
      firebase
        .firestore()
        .collection("chats")
        .doc(this.props.chatID)
        .collection("messages")
        .add({
          content: messages,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          sender: this.props.userType
        });
    }
  };

  accept = () => {
    if (this.props.userType === "seller") {
      firebase
        .firestore()
        .collection("chats")
        .doc(this.props.chatID)
        .set(
          {
            status: "active"
          },
          { merge: true }
        )
        .then(() => {
          console.log("Accepted");
        });
    }
  };

  _renderComposer = props => {
    return (
      <Composer
        {...props}
        placeholder={"Scrivi un messaggio"}
        textInputStyle={{
          fontSize: 18
        }}
      />
    );
  };

  _renderInputToolbar = props => {
    return (
      <InputToolbar
        {...props}
        containerStyle={{
          borderRadius: 12,
          elevation: 4,
          marginHorizontal: 20,
          marginVertical: 16,
          borderTopWidth: 0
        }}
        primaryStyle={{}}
      />
    );
  };

  _renderSend = props => {
    const active = props.text ? true : false;
    return (
      <Send
        {...props}
        containerStyle={{
          alignSelf: "center",
          paddingVertical: 10,
          paddingHorizontal: 18,
          borderWidth: 0
        }}
        alwaysShowSend={true}
        disabled={!active}
      >
        <Icon
          name="paper-plane"
          size={20}
          style={{
            color: active ? "black" : "gray"
          }}
        />
      </Send>
    );
  };

  getContent = () => {
    const { status, user, isLoading } = this.props;
    const { messages } = this.props;
    if (status === "active") {
      return (
        <GnumaChat
          messages={messages}
          onSend={this.onSend}
          user={{
            _id: 1,
            name: "Federico"
          }}
        />
      );
    } else if (this.props.userType === "buyer") {
      return (
        <View style={{ flex: 1, marginHorizontal: 15 }}>
          <Header3 style={{ textAlign: "center", marginTop: 20 }}>
            Ricorda che Federico non riceverà i tuoi messaggi finche non
            accetterà la conversazione
          </Header3>
          <View
            style={{ flex: 1, justifyContent: "flex-end", marginBottom: 15 }}
          >
            <View
              style={{
                backgroundColor: "white",
                elevation: 3,
                borderRadius: 4,
                padding: 10
              }}
            >
              <Header3 color={"black"} style={{ alignSelf: "stretch" }}>
                Sei nella chat con Federico riguardo questo libro inizia dicendo
                ciao!
              </Header3>
              <Button
                style={{
                  backgroundColor: "white",
                  elevation: 2,
                  flexDirection: "row",
                  padding: 10,
                  justifyContent: "center",
                  borderRadius: 8,
                  marginTop: 10
                }}
              >
                <Header4 color={"primary"}>Contatta ora</Header4>
                <Icon
                  name="paper-plane"
                  size={20}
                  style={{
                    position: "absolute",
                    right: 10,
                    alignSelf: "center"
                  }}
                />
              </Button>
            </View>
          </View>
        </View>
      );
    } else {
      return (
        <View style={{ flex: 1, marginHorizontal: 15 }}>
          <View
            style={{ flex: 1, justifyContent: "flex-end", marginBottom: 15 }}
          >
            <View
              style={{
                backgroundColor: "white",
                elevation: 3,
                borderRadius: 4,
                padding: 10
              }}
            >
              <Header3 color={"black"} style={{ alignSelf: "stretch" }}>
                Qualcuno vuole iniziare una conversazione con te
              </Header3>
              <Button
                style={{
                  backgroundColor: "white",
                  elevation: 2,
                  flexDirection: "row",
                  padding: 10,
                  justifyContent: "center",
                  borderRadius: 8,
                  marginTop: 10
                }}
                onPress={this.accept}
              >
                <Header4 color={"primary"}>Accetta</Header4>
              </Button>
              <Button
                style={{
                  backgroundColor: "white",
                  elevation: 2,
                  flexDirection: "row",
                  padding: 10,
                  justifyContent: "center",
                  borderRadius: 8,
                  marginTop: 10
                }}
              >
                <Header4 color={"primary"}>Rifiuta</Header4>
              </Button>
            </View>
          </View>
        </View>
      );
    }
  };

  _local_setStatus = () => this.props.setStatus(1);
}

/*
        <GiftedChat
          messages={messages}
          onSend={this.onSend}
          //loadEarlier={this.state.loadEarlier}
          //onLoadEarlier={this.onLoadEarlier}
          //isLoadingEarlier={this.state.isLoadingEarlier}
          renderComposer={this._renderComposer}
          renderSend={this._renderSend}
          renderInputToolbar={this._renderInputToolbar}
          user={user}
          minInputToolbarHeight={60}
        />
*/

/*<GnumaChat
          messages={messages}
          onSend={message =>
            this.setState(prevState => ({
              messages: [message, ...prevState.messages]
            }))
          }
          user={{
            _id: 1,
            name: "Federico"
          }}
        />
        */
