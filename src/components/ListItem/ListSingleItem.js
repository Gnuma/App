import React, { Component } from "react";
import { Text, View, Image } from "react-native";
import { withNavigation } from "react-navigation";
import Button from "../Button";
import PropTypes from "prop-types";
import styles from "./styles";
import { Header1, Header3, Header5, Header2 } from "../../components/Text";
import Item from "./Item";

const itemHeight = 130;
export class ListSingleItem extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired
  };

  render() {
    const { data } = this.props;
    const { book, pk } = data;

    return (
      <Button
        onPress={() =>
          this.props.navigation.navigate("Item", {
            itemID: pk,
            name: book.title,
            authors: book.author
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
        <Item data={this.props.data} isSingle={this.props.isSingle} />
      </Button>
    );
  }
}

export default withNavigation(ListSingleItem);
