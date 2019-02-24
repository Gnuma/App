import React, { Component } from "react";
import { Text, View, Image } from "react-native";
import { Header3, Header4, Header5 } from "../Text";
import Button from "../Button";

const itemHeight = 130;

export default class BookItem extends Component {
  render() {
    const { title, img, authors, isbn, subject } = this.props.data;
    const year = this._formatYears(this.props.year);
    return (
      <Button onPress={this._local_handleSelection}>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            height: itemHeight,
            borderRadius: 10,
            backgroundColor: "white",
            elevation: 4,
            marginVertical: 6,
            marginHorizontal: 15
          }}
        >
          <Image
            style={{
              height: itemHeight,
              width: 122,
              borderTopLeftRadius: 10,
              borderBottomLeftRadius: 10
            }}
            source={require("../../media/imgs/thumbnail-test.png")}
          />
          <View style={{ flex: 1, margin: 5 }}>
            <View style={{ flex: 0 }}>
              <Header3 color={"primary"}>{title}</Header3>
              <Header5 numberOfLines={1} style={{ marginLeft: 10 }}>
                {authors}
              </Header5>
            </View>
            <View style={{ flex: 1, marginTop: 10, flexDirection: "row" }}>
              <View>
                <Header4>ISBN</Header4>
                <Header4>Materia</Header4>
                <Header4>Anno</Header4>
              </View>
              <View style={{ flex: 1, marginLeft: 20 }}>
                <Header4>{isbn}</Header4>
                <Header4>{subject}</Header4>
                <Header4>{year}</Header4>
              </View>
            </View>
          </View>
        </View>
      </Button>
    );
  }

  _formatYears = year => {
    switch (year) {
      case 1:
        return "I";
      case 2:
        return "II";
      case 3:
        return "III";
      case 4:
        return "IV";
      case 5:
        return "V";
      default:
        return "Non specificato";
    }
  };

  _local_handleSelection = () => {
    this.props.handleSelection(this.props.data.isbn);
  };
}
