import React, { Component } from "react";
import { Text, View, Image } from "react-native";
import { withNavigation } from "react-navigation";
import Button from "../Button";
import PropTypes from "prop-types";
import styles from "./styles";
import { Header1, Header2, Header3, Header5 } from "../../components/Text";
import Item from "./Item";

export class ListMultiItem extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    isSingle: PropTypes.bool
  };

  render() {
    const { book } = this.props.data;
    return (
      <Button
        onPress={() =>
          this.props.navigation.navigate("Item", {
            itemID: "ID",
            name: name,
            authors: authors
          })
        }
        style={{
          flex: 1,
          margin: 10,
          elevation: 3,
          borderRadius: 10,
          backgroundColor: "white"
        }}
      >
        <View
          style={{
            flex: 1,
            flexGrow: 1,
            paddingLeft: 5,
            paddingBottom: 5,
            borderTopEndRadius: 10,
            backgroundColor: "white"
          }}
        >
          <Header2 color={"primary"}>{book.title}</Header2>
          <Header5>{book.author}</Header5>
        </View>
        <Item data={this.props.data} isSingle={this.props.isSingle} />
      </Button>
    );
  }
}

export default withNavigation(ListMultiItem);
