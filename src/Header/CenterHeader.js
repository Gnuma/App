import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, TextInput, TouchableWithoutFeedback } from "react-native";
import styles from "./styles";
import Icon from "react-native-vector-icons/FontAwesome";
import Button from "../components/Button";
import Logo from "./Logo";
import { Header3 } from "../components/Text";
import colors from "../styles/colors";

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
        <View style={styles.searchBoxContainer}>
          <TextInput
            onChangeText={onChangeText}
            value={searchQuery}
            style={styles.searchInput}
            onSubmitEditing={onSubmitEditing}
            blurOnSubmit={true}
            ref={setRef}
            autoFocus={!searchQuery}
            onFocus={onFocus}
            placeholder={"Cerca un libro"}
          />
          {searchQuery && isActive ? (
            <Button
              onPress={resetToHome}
              style={[styles.p5, { marginRight: 3 }]}
            >
              <Icon name="times" size={24} style={styles.resetIcon} />
            </Button>
          ) : (
            <Icon name="search" size={24} style={styles.searchIcon} />
          )}
        </View>
      );
    } else {
      return <Logo />;
    }
  }
}

export default CenterHeader;
