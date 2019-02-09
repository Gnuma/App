import React, { Component } from "react";
import { View, Text } from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Icon from "react-native-vector-icons/Ionicons";
import styles from "./styles";

export class Header extends Component {
  render() {
    return (
      <View style={styles.header}>
        <Icon
          name="md-menu"
          size={30}
          style={{
            color: "white"
          }}
        />
        <Text>Gnuma</Text>
      </View>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
