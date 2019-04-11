import React, { Component } from "react";
import { Text, View, FlatList } from "react-native";
import PropTypes from "prop-types";
import { Header2, Header4, Header5 } from "../Text";
import Icon from "react-native-vector-icons/FontAwesome";
import colors from "../../styles/colors";
import Button from "../Button";
import Divider from "../Divider";

export default class ChatsList extends Component {
  static propTypes = {
    isAuthenticated: PropTypes.bool,
    focus: PropTypes.number,
    data: PropTypes.object,
    orderedData: PropTypes.array
  };

  render() {
    const { data, focus, orderedData } = this.props;
    //console.log(orderedData);
    return (
      <FlatList
        data={orderedData[focus].chats}
        renderItem={this._renderItem}
        keyExtractor={this._keyExtractor}
        extraData={data}
      />
    );
  }

  _renderItem = ({ item, index }) => {
    const { data, orderedData, focus } = this.props;
    return (
      <View>
        <ChatLink
          data={data[orderedData[focus].itemID].chats[item]}
          onGoChat={this.props.onGoChat}
        />
        {index !== orderedData[focus].chats.length - 1 ? (
          <Divider style={{ marginHorizontal: 20, borderBottomWidth: 0.8 }} />
        ) : null}
      </View>
    );
  };

  _keyExtractor = (item, index) => {
    return item;
  };
}

export class ChatLink extends Component {
  render() {
    const { data } = this.props;

    return (
      <Button
        style={{ paddingHorizontal: 20, paddingVertical: 10 }}
        onPress={this.props.onGoChat}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View style={{ flexDirection: "row", flex: 1 }}>
            <Header2 color={"black"}>{data.UserTO.username}</Header2>
          </View>
          <Icon
            name={"chevron-right"}
            size={20}
            style={{ color: colors.black }}
          />
        </View>
        {data.messages.length > 0 ? (
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Header4 color={"black"} style={{ flex: 1 }}>
              {data.messages[0].content}
            </Header4>
            <Header5>{this.dateDisplay(data.messages[0].timestamp)}</Header5>
          </View>
        ) : null}
      </Button>
    );
  }

  dateDisplay = date => {
    if (Math.abs(new Date() - date) < dayInMilliseconds)
      return (
        date.getHours() +
        ":" +
        (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes())
      );
    else if (Math.abs(new Date() - date) < dayInMilliseconds * 2) return "Ieri";
    else
      return (
        date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear()
      );
  };
}

const dayInMilliseconds = 1000 * 60 * 60 * 24;
