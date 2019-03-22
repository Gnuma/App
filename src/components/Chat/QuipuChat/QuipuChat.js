import React, { Component } from "react";
import { View, SectionList, TextInput, Text } from "react-native";
import PropTypes from "prop-types";
import Button from "../../Button";
import { Header3, Header4 } from "../../Text";
import QuipuBubble from "./QuipuBubble";
import uuid from "uuid";
import Icon from "react-native-vector-icons/FontAwesome";
import colors from "../../../styles/colors";

const getOnlyDate = fullDate => {
  return new Date(
    fullDate.getFullYear(),
    fullDate.getMonth(),
    fullDate.getDate()
  );
};

export default class QuipuChat extends Component {
  static propTypes = {
    messages: PropTypes.array,
    onSend: PropTypes.func,
    user: PropTypes.object
  };

  constructor(props) {
    super(props);

    this.state = {
      messages: [],
      user: props.user,
      lastDayIndex: 0,
      formattedData: [{ title: "first_index", data: [] }],
      input: ""
    };
  }

  static getDerivedStateFromProps(props, state) {
    const { messages: newMessages } = props;
    const { messages: oldMessages } = state;

    //console.log(newMessages);
    let updatedData = state.formattedData;
    if (newMessages.length > oldMessages.length) {
      let lastUpdatedIndex = newMessages.length - oldMessages.length;
      let lastDate;
      let lastUserID;
      if (oldMessages.length === 0) {
        lastDate = false;
      } else {
        lastDate = getOnlyDate(newMessages[lastUpdatedIndex].createdAt);
        lastUserID = newMessages[lastUpdatedIndex].user._id;
      }
      for (let i = lastUpdatedIndex - 1; i >= 0; i--) {
        const newDate = getOnlyDate(newMessages[i].createdAt);
        //console.log("Date Comparison: ", newDate, lastDate, newDate > lastDate);
        if (!lastDate || newDate > lastDate) {
          updatedData[0] = { title: newDate, data: updatedData[0].data };
          updatedData.unshift({
            title: "first_index",
            data: [
              {
                ...newMessages[i],
                fromSameUser: true
              }
            ]
          });
          //updatedData[0].data.push(newMessages[i]);
          lastDate = newDate;
          lastUserID = newMessages[i].user._id;
        } else {
          updatedData[0].data.unshift({
            ...newMessages[i],
            fromSameUser: lastUserID == newMessages[i].user._id
          });
          //console.log(lastUserID, newMessages[i].user._id);
          lastUserID = newMessages[i].user._id;
        }
      }
    }

    //console.log(updatedData);

    return {
      ...state,
      messages: newMessages,
      formattedData: updatedData
    };
  }

  render() {
    const { formattedData, user } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <SectionList
          inverted
          style={{ flex: 1 }}
          renderItem={({ item, index, section }) => {
            return (
              <QuipuBubble
                text={item.text}
                sender={item.user}
                fromUser={this.props.user._id === item.user._id}
                fromSameUser={item.fromSameUser}
              />
            );
          }}
          renderSectionHeader={({ section: { title } }) => {
            if (title === "first_index") return null;
            return (
              <Header3
                color={"grey"}
                style={{ alignSelf: "center", marginVertical: 14 }}
              >
                {title.getFullYear() + " / " + title.getDate()}
              </Header3>
            );
          }}
          sections={formattedData}
          keyExtractor={(item, index) => item._id + index}
        />
        <View
          style={{
            flexDirection: "row",
            borderTopColor: "black"
          }}
        >
          <TextInput
            style={{ flex: 1 }}
            placeholder={"Scrivi un messaggio"}
            value={this.state.input}
            onChangeText={this._handleChangeInput}
          />
          <View
            style={{
              width: 50
            }}
          >
            <Button
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center"
              }}
              onPress={this._handleSend}
              disabled={!this.state.input}
            >
              <Icon
                name="paper-plane"
                style={{
                  color: this.state.input ? colors.primary : colors.grey
                }}
                size={22}
              />
            </Button>
          </View>
        </View>
      </View>
    );
  }

  _handleChangeInput = text => {
    this.setState({
      input: text
    });
  };

  _handleSend = () => {
    if (this.state.input) {
      /*
      this.props.onSend({
        _id: uuid.v4(),
        createdAt: new Date(),
        text: this.state.input,
        user: this.props.user
      });
      */
      this.props.onSend(this.state.input);
      this._handleChangeInput("");
    }
  };
}
