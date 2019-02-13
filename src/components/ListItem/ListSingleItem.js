import React, { Component } from "react";
import { Text, View, Image } from "react-native";
import { withNavigation } from "react-navigation";
import Button from "../Button";
import PropTypes from "prop-types";
import styles from "./styles";

export class ListSingleItem extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired
  };

  render() {
    const { name, id, img, authors, price } = this.props.data;
    return (
      <Button onPress={() => this.props.navigation.navigate("Item")}>
        <View style={styles.container}>
          <View>
            <Image
              style={styles.img}
              source={require("../../media/imgs/thumbnail-test.png")}
            />
          </View>
          <View>
            <Text>{price}</Text>
          </View>
        </View>
      </Button>
    );
  }
}

export default withNavigation(ListSingleItem);
