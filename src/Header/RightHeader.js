import React, { Component } from "react";
import PropTypes from "prop-types";
import styles from "./styles";
import Icon from "react-native-vector-icons/FontAwesome";
import Button from "../components/Button/Button";

export class RightHeader extends Component {
  static propTypes = {
    setActive: PropTypes.func
  };
  render() {
    const { setActive } = this.props;
    return (
      <Button onPress={setActive}>
        <Icon name="search" size={24} style={styles.icon} />
      </Button>
    );
  }
}

export default RightHeader;
