import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, TextInput, TouchableWithoutFeedback } from "react-native";
import styles from "./styles";
import Icon from "react-native-vector-icons/FontAwesome";
import Button from "../components/Button";
import Logo from "./Logo";
import { Header3 } from "../components/Text";

export class CenterHeader extends Component {
  static propTypes = {
    isActive: PropTypes.bool,
    searchQuery: PropTypes.string,
    onChangeText: PropTypes.func,
    onFocus: PropTypes.func,
    refProp: PropTypes.object,
    onSubmitEditing: PropTypes.func,
    resetToHome: PropTypes.func
  };
  render() {
    const {
      isActive,
      searchQuery,
      onChangeText,
      onFocus,
      onSubmitEditing,
      resetToHome,
      setRef
    } = this.props;
    if (isActive || searchQuery) {
      return (
        <View
          style={{
            flex: 1,
            flexDirection: "row"
          }}
        >
          <TextInput
            onChangeText={onChangeText}
            value={searchQuery}
            style={styles.searchInput}
            onSubmitEditing={onSubmitEditing}
            blurOnSubmit={true}
            ref={setRef}
            autoFocus={true}
            onFocus={onFocus}
          />

          <Button onPress={resetToHome}>
            <Icon name="times" size={24} style={[styles.icon, styles.p5]} />
          </Button>
        </View>
      );
    } else {
      return <Logo />;
    }
  }
}

export default CenterHeader;
