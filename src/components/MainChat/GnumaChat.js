import React, { Component } from "react";
import { View, SectionList, TextInput, Text } from "react-native";
import PropTypes from "prop-types";
import Button from "../Button";
import { Header3, Header4 } from "../Text";
import GnumaBubble from "./GnumaBubble";
import uuid from "uuid";

const getOnlyDate = fullDate => {
  return new Date(
    fullDate.getFullYear(),
    fullDate.getMonth(),
    fullDate.getDate()
  );
};

export default class GnumaChat extends Component {
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

    console.log(newMessages.length);
    let updatedData = state.formattedData;
    if (newMessages.length > oldMessages.length) {
      let lastDate;
      if (oldMessages.length === 0) {
        lastDate = false;
      } else {
        lastDate = getOnlyDate(newMessages[oldMessages.length - 1].createdAt);
      }
      for (let i = oldMessages.length; i < newMessages.length; i++) {
        const newDate = getOnlyDate(newMessages[i].createdAt);
        if (!lastDate || newDate < lastDate) {
          updatedData[updatedData.length - 1].data.push(newMessages[i]);
          updatedData.push({ title: newDate, data: [] });
          lastDate = newDate;
        } else {
          updatedData[updatedData.length - 2].data.push(newMessages[i]);
        }
      }
    }

    return {
      ...state,
      messages: newMessages,
      formattedData: updatedData
    };
  }

  render() {
    const { formattedData, user } = this.state;
    console.log(formattedData);
    return (
      <View style={{ flex: 1 }}>
        <SectionList
          inverted
          style={{ flex: 1 }}
          renderItem={({ item, index, section }) => {
            return <GnumaBubble key={item._id} text={item.text} />;
          }}
          renderSectionHeader={({ section: { title } }) => {
            if (title === "first_index") return null;
            return (
              <Header3 style={{ fontWeight: "bold" }}>
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
            borderTopWidth: 1,
            borderTopColor: "black"
          }}
        >
          <TextInput
            style={{ flex: 1 }}
            placeholder={"Scrivi un messaggio"}
            value={this.state.input}
            onChangeText={this._handleChangeInput}
          />
          <Button onPress={this._handleSend}>
            <Header3 color={"primary"}>Invia</Header3>
          </Button>
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
    this.props.onSend({
      _id: uuid.v4(),
      createdAt: new Date(),
      text: this.state.input,
      user: this.props.user
    });
    this.setState({
      input: ""
    });
    console.log(this.state.input);
  };
}
