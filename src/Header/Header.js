import React, { Component } from "react";
import { View, Keyboard } from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withNavigation } from "react-navigation";
import styles from "./styles";
import * as searchActions from "../store/actions/search";
import * as authActions from "../store/actions/auth";
import LeftHeader from "./LeftHeader";
import CenterHeader from "./CenterHeader";
import RightHeader from "./RightHeader";

export class Header extends Component {
  static propTypes = {
    searchRedux: PropTypes.func,
    setActiveRedux: PropTypes.func,
    searchQuery: PropTypes.string,
    isActive: PropTypes.bool,
    handleSearchQueryChange: PropTypes.func
  };

  render() {
    const { isActive, searchQuery } = this.props;
    const isItem =
      this.props.navigation &&
      this.props.navigation.state.routes[
        this.props.navigation.state.routes.length - 1
      ].routeName === "Item";
    return (
      <View style={styles.header}>
        <LeftHeader
          isActive={isActive}
          isItem={isItem}
          handleGoBack={this.setInactive}
        />
        <CenterHeader
          isActive={isActive}
          searchQuery={searchQuery}
          onChangeText={this.handleChangeText}
          onSubmitEditing={this.search}
          resetToHome={this.resetToHome}
          onFocus={this.setActive}
          setRef={this.setSearchRef}
        />
        <RightHeader
          setActive={this.openSearchField}
          onLogout={this.props.logoutRedux}
          isAuthenticated={this.props.isAuthenticated}
          visible={!isActive && !searchQuery}
        />
      </View>
    );
  }

  setSearchRef = input => {
    this.searchField = input;
  };

  handleChangeText = searchQuery => {
    this.props.handleSearchQueryChange(searchQuery);
  };

  resetToHome = () => {
    this.props.goHomeRedux();
  };

  search = () => {
    this.props.searchRedux(this.props.searchQuery);
  };

  setActive = () => {
    this.props.setActiveRedux(true);
    this.searchField.focus();
  };

  setInactive = () => {
    Keyboard.dismiss();
    this.props.setActiveRedux(false);
  };

  openSearchField = () => {
    this.props.setActiveRedux(true);
  };
}

const mapStateToProps = state => ({
  searchQuery: state.search.searchQuery,
  isActive: state.search.isActive,
  isAuthenticated: state.auth.token !== null
});

const mapDispatchToProps = dispatch => {
  return {
    searchRedux: (search_query, cap) =>
      dispatch(searchActions.search(search_query, cap)),
    setActiveRedux: isActive =>
      dispatch(searchActions.searchSetActive(isActive)),
    handleSearchQueryChange: searchQuery =>
      dispatch(searchActions.searchSetSearchQuery(searchQuery)),
    logoutRedux: () => dispatch(authActions.authLogout()),
    goHomeRedux: () => dispatch(searchActions.searchGoHome())
  };
};

export default withNavigation(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Header)
);
