import React, { Component } from "react";
import { View } from "react-native";
import PropTypes from "prop-types";
import styles from "./styles";
import Icon from "react-native-vector-icons/FontAwesome";
import Button from "../components/Button";

import NavigationService from "../navigator/NavigationService";
import protectedAction from "../utils/protectedAction";

export class RightHeader extends Component {
  static propTypes = {
    setActive: PropTypes.func,
    onLogout: PropTypes.func,
    isAuthenticated: PropTypes.bool
  };
  render() {
    const { setActive, visible, isAuthenticated } = this.props;
    if (visible) {
      return (
        <View style={styles.rightHeaderContainer}>
          <Button
            onPress={isAuthenticated ? this.props.onLogout : this._goAuth}
            style={{ marginRight: 4, padding: 10, borderRadius: 6 }}
          >
            <Icon name="gear" size={24} style={styles.icon} />
          </Button>
        </View>
      );
    } else {
      return null;
    }
  }

  _goAuth = () => {
    //NavigationService.protectedNavigation("Home", null, () =>
    //  console.log("WORKING")
    //);
    protectedAction()
      .then(() => NavigationService.navigate("App"))
      .catch(() => console.log("User went out"));
  };
}

export default RightHeader;
