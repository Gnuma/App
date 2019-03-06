import React, { Component } from "react";
import { View } from "react-native";
import PropTypes from "prop-types";
import styles from "./styles";
import Icon from "react-native-vector-icons/FontAwesome";
import Button from "../components/Button";

import NavigationService from "../navigator/NavigationService";

export class RightHeader extends Component {
  static propTypes = {
    setActive: PropTypes.func,
    onLogout: PropTypes.func,
    isAuthenticated: PropTypes.bool
  };
  render() {
    const { setActive } = this.props;
    return (
      <View style={styles.rightHeaderContainer}>
        <Button onPress={setActive} style={{ marginRight: 10 }}>
          <Icon name="search" size={24} style={styles.icon} />
        </Button>
        {this.props.isAuthenticated ? (
          <Button onPress={this.props.onLogout} style={{ marginRight: 10 }}>
            <Icon name="gear" size={24} style={styles.icon} />
          </Button>
        ) : (
          <Button
            onPress={() =>
              NavigationService.protectedNavigation("CHAT", null, () =>
                console.log("WORKING")
              )
            }
            style={{ marginRight: 10 }}
          >
            <Icon name="gear" size={24} style={styles.icon} />
          </Button>
        )}
      </View>
    );
  }
}

export default RightHeader;
