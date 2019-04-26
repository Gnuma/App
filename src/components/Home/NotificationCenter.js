import React, { Component } from "react";
import {
  View,
  Dimensions,
  FlatList,
  TouchableWithoutFeedback
} from "react-native";
import colors from "../../styles/colors";
import { Header2, Header3, Header4 } from "../Text";
import memoize from "memoize-one";
import SolidButton from "../SolidButton";
import Button from "../Button";
import Icon from "react-native-vector-icons/FontAwesome";
import { ChatType } from "../../utils/constants";

export default class NotificationCenter extends Component {
  state = {
    isActive: false
  };

  setActive = () => {
    this.setState(prevState => ({
      isActive: !prevState.isActive
    }));
  };

  filter = memoize(data => this.formatNotifications(data));

  _keyExtractor = item => {
    return item.toString();
  };

  _renderItem = ({ item, index }) => {
    const data = this.props.data[item];
    const number = data.data.length == 0 ? "a " : "e ";
    const type = (data.type === ChatType.sales ? "domand" : "rispost") + number;
    let commentIDs = [];
    data.data.forEach(comment => commentIDs.push(comment.pk));

    const text = "Nuov" + number + type + "su ";
    const bookTitle = data.book.title;
    return (
      <SolidButton
        style={{
          marginHorizontal: 10,
          marginVertical: 5
        }}
        icon="chevron-circle-right"
        iconSize={20}
        iconStyle={{
          color: colors.secondary
        }}
        onPress={() =>
          this.props.commentHandler(data.pk, data.book, commentIDs)
        }
      >
        <Header3 color="black" style={{ fontSize: 17 }} numberOfLines={1}>
          {text}
          <Header3 color="secondary">{bookTitle}</Header3>
        </Header3>
      </SolidButton>
    );
  };

  render() {
    const data = this.props.data;
    const orderedData = this.props.orderedData;
    return (
      <View
        style={{
          height: 46
        }}
      >
        <View
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            zIndex: 1,
            backgroundColor: colors.white
          }}
        >
          <Button
            style={{
              alignSelf: "center",
              padding: 10,
              borderRadius: 6,
              elevation: this.state.isActive ? 0 : 2,
              backgroundColor: colors.white
            }}
            onPress={this.setActive}
          >
            <Icon name={"bell"} size={24} style={{ color: colors.darkRed }} />
          </Button>
          {this.state.isActive ? (
            <FlatList
              contentContainerStyle={{
                backgroundColor: colors.white,
                overflow: "visible",
                borderRadius: 6,
                borderWidth: 1,
                flex: 1,
                marginHorizontal: 20,
                paddingVertical: 5
              }}
              renderItem={this._renderItem}
              data={orderedData}
              extraData={data}
              keyExtractor={this._keyExtractor}
              onStartShouldSetResponderCapture={() => true}
            />
          ) : null}
        </View>
      </View>
    );
  }
}

/*
    console.log(batch);
    let data = {};
    for (let i = 0; i < batch.length; i++) {
      const fatherPK =
        batch[i].fatherPK !== undefined ? batch[i].fatherPK : batch[i].pk;
      //data[fatherPK][batch[i].pk] = batch[i];

      if (data[fatherPK]) {
        data[fatherPK][batch[i].pk] = batch[i];
      } else {
        data[fatherPK] = {};
        data[fatherPK][batch[i].pk] = batch[i];
      }
    }
    console.log(data);
    return data;
    */
