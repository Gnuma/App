import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import Button from "./Button";
import Icon from "react-native-vector-icons/FontAwesome";
import { Header1 } from "./Text";
import colors from "./../styles/colors";
import NavigationService from "../navigator/NavigationService";

class HomeHeader extends Component {
  static propTypes = {
    title: PropTypes.string,
    icon: PropTypes.string
  };

  render() {
    const { title, icon } = this.props;
    return (
      <View style={{ elevation: 0 }}>
        <View style={styles.container}>
          <Button onPress={this._local_handleGoBack} style={styles.goBackBtn}>
            <Icon name={icon} size={24} style={styles.backIcon} />
          </Button>
          <View>
            <Header1 color={"primary"}>{title}</Header1>
          </View>
        </View>
      </View>
    );
  }

  _local_handleGoBack = () => {
    NavigationService.goBack(null);
  };
}
HomeHeader.defaultProps = {
  icon: "chevron-left"
};

export default HomeHeader;

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
