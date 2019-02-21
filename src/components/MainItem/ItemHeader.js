import React, { Component } from "react";
import PropTypes from "prop-types";
import { View } from "react-native";
import styles from "./styles";
import Button from "../Button";
import Icon from "react-native-vector-icons/FontAwesome";
import { Header2, Header5 } from "../Text";

export default class ItemHeader extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    title: PropTypes.string,
    authors: PropTypes.string
  };
  render() {
    return (
      <View
        style={{
          height: 60,
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: "white",
          elevation: 6
        }}
      >
        <Button onPress={this.handleGoBack} style={{ padding: 10 }}>
          <Icon name="chevron-left" size={24} />
        </Button>
        <View
          style={{
            flex: 1,
            marginLeft: 10,
            justifyContent: "center"
          }}
        >
          <Header2>{this.props.title}</Header2>
          <Header5 style={{ marginLeft: 10 }}>di {this.props.authors}</Header5>
        </View>
      </View>
    );
  }

  handleGoBack = () => {
    this.props.navigation.goBack(null);
  };
}
