import React, { Component } from "react";
import { View, Dimensions, FlatList } from "react-native";
import colors from "../../styles/colors";
import { Header2, Header3 } from "../Text";
import memoize from "memoize-one";
import SolidButton from "../SolidButton";
export default class NotificationCenter extends Component {
  filter = memoize(data => this.formatNotifications(data));

  formatNotifications = data => {
    return Object.keys(data).map(function(key) {
      return data[key];
    });
  };

  _keyExtractor = item => {
    return item.itemPK.toString();
  };

  _renderItem = ({ item, index }) => {
    const singleComment = item.commentPK !== null;
    const text = singleComment
      ? "Nuova domanda su " + item.book
      : "Nuove domande su " + item.book;
    return (
      <SolidButton
        style={{
          margin: 4
        }}
        icon="chevron-circle-right"
        iconSize={20}
        iconStyle={{
          color: colors.darkRed
        }}
        onPress={() =>
          this.props.commentHandler(item.itemPK, item.book, item.commentPK)
        }
      >
        <Header3 color="black" style={{ fontSize: 17 }}>
          {text}
        </Header3>
      </SolidButton>
    );
  };

  render() {
    const data = this.props.data;
    const arrayData = this.filter(data);

    return (
      <View
        style={{
          marginHorizontal: 20,
          marginBottom: 10
        }}
      >
        <Header2 color={"primary"} style={{ marginLeft: 20 }}>
          Notifiche
        </Header2>
        <FlatList
          contentContainerStyle={{
            backgroundColor: colors.white
          }}
          renderItem={this._renderItem}
          data={arrayData}
          keyExtractor={this._keyExtractor}
        />
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
