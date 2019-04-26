import React, { Component } from "react";
import { Text, View, FlatList } from "react-native";
import PropTypes from "prop-types";
import { Header2, Header4, Header5 } from "../Text";
import Icon from "react-native-vector-icons/FontAwesome";
import colors from "../../styles/colors";
import Button from "../Button";
import Divider from "../Divider";
import BooleanButton from "../BooleanButton";
import helper from "../../utils/helper";

export default class SalesChatsList extends Component {
  static propTypes = {
    isAuthenticated: PropTypes.bool,
    focus: PropTypes.number,
    data: PropTypes.object,
    orderedData: PropTypes.array,
    onGoChat: PropTypes.func
  };

  render() {
    const { data, focus, orderedData } = this.props;
    console.log(orderedData[focus].chats);
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
          itemID={orderedData[focus].itemID}
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
    const { data, itemID } = this.props;

    return (
      <Button
        style={{ paddingHorizontal: 20, paddingVertical: 10 }}
        onPress={e => {
          //console.log(e.currentTarget);
          this.props.onGoChat(itemID, data._id);
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View style={{ flexDirection: "row", flex: 1 }}>
            <Header2 color={"black"}>{data.UserTO.username}</Header2>
          </View>
          <Icon
            name={"chevron-circle-right"}
            size={22}
            style={{ color: data.hasNews ? colors.darkRed : colors.black }}
          />
        </View>
        {this.renderFooter()}
      </Button>
    );
  }

  renderFooter = () => {
    const { data } = this.props;
    if (data.status === "pending" || data.status === "loadingDecision") {
      return (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Header4
            color={data.hasNews ? "darkRed" : "black"}
            style={{ flex: 1, marginRight: 10 }}
            numberOfLines={1}
          >
            {data.UserTO.username} vuole contattarti
          </Header4>
          <View onStartShouldSetResponder={event => true}>
            <BooleanButton />
          </View>
        </View>
      );
    } else if (data.messages.length > 0) {
      return (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Header4
            color={data.hasNews ? "darkRed" : "black"}
            style={{ flex: 1, marginRight: 10 }}
            numberOfLines={1}
          >
            {data.messages[0].text}
          </Header4>
          <Header5 color={data.hasNews ? "darkRed" : "grey"}>
            {helper.dateDisplay(data.messages[0].createdAt)}
          </Header5>
        </View>
      );
    }
    return null;
  };
}
