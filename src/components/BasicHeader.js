import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import Button from "./Button";
import Icon from "react-native-vector-icons/FontAwesome";
import { Header1 } from "./Text";
import colors from "./../styles/colors";
import NavigationService from "../navigator/NavigationService";

export default class HomeHeader extends Component {
  static propTypes = {
    title: PropTypes.string
  };

  render() {
    const { title } = this.props;
    return (
      <View style={styles.container}>
        <Button onPress={this._local_handleGoBack} style={styles.goBackBtn}>
          <Icon name="chevron-left" size={24} style={styles.backIcon} />
        </Button>
        <View>
          <Header1 color={"primary"}>{title}</Header1>
        </View>
      </View>
    );
  }

  _local_handleGoBack = () => {
    NavigationService.goBack(null);
  };
}

const styles = StyleSheet.create({
  container: {
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    elevation: 6
  },
  goBackBtn: {
    padding: 10,
    borderRadius: 4
  },
  backIcon: {
    color: colors.black
  }
});
