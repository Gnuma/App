import React, { Component } from "react";
import PropTypes from "prop-types";
import { View } from "react-native";
import { HeaderStyles as styles } from "./styles";
import Button from "../Button";
import Icon from "react-native-vector-icons/FontAwesome";
import { Header2, Header5 } from "../Text";
import colors from "../../styles/colors";

export default class ItemHeader extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    title: PropTypes.string,
    authors: PropTypes.string
  };
  render() {
    return (
      <View style={styles.container}>
        <Button onPress={this.handleGoBack} style={styles.goBack}>
          <Icon name="chevron-left" size={24} style={{ color: colors.black }} />
        </Button>
        <View style={styles.content}>
          <Header2 color={"primary"}>{this.props.title}</Header2>
          <Header5 style={styles.authors}>di {this.props.authors}</Header5>
        </View>
      </View>
    );
  }

  handleGoBack = () => {
    this.props.navigation.goBack(null);
  };
}
