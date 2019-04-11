import React, { Component } from "react";
import { View, Text } from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import ChatHeader from "../components/Chat/ChatHeader";
import { single } from "../mockData/Chat2";
import { Header2 } from "../components/Text";
import { GiftedChat } from "react-native-gifted-chat";

export class Chat extends Component {
  static propTypes = {};

  render() {
    const { data } = this.props;

    return (
      <View style={{ flex: 1 }}>
        <ChatHeader data={single} book={{ title: "Matematica Verde 3" }} />
        <GiftedChat
          messages={single.messages}
          onSend={this.onSend}
          user={{
            _id: 1 // sent messages should have same user._id
          }}
        />
      </View>
    );
  }

  onSend = text => {
    console.log(text);
  };
}

const mapStateToProps = state => ({
  data: state.sales.data
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Chat);

//<ChatHeader data={single} />
