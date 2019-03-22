import React, { Component } from "react";
import { Text, View, Image } from "react-native";
import { withNavigation } from "react-navigation";
import Button from "../Button";
import PropTypes from "prop-types";
import styles from "./styles";
import Item from "./Item";

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
        style={styles.itemButton}
      >
        <Item data={this.props.data} isSingle={this.props.isSingle} />
      </Button>
    );
  }
}

export default withNavigation(ListSingleItem);
