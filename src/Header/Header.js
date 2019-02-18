import React, { Component } from "react";
import { View } from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withNavigation } from "react-navigation";
import styles from "./styles";
import * as searchActions from "../store/actions/search";
import LeftHeader from "./LeftHeader";
import CenterHeader from "./CenterHeader";
import RightHeader from "./RightHeader";

export class Header extends Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    searchRedux: PropTypes.func,
    setActiveRedux: PropTypes.func,
    searchQueryRedux: PropTypes.string
  };

  state = {
    isActive: false,
    searchQuery: ""
  };

  render() {
    const { isActive, searchQuery } = this.state;
    const isItem =
      this.props.navigation &&
      this.props.navigation.state.routes[
        this.props.navigation.state.routes.length - 1
      ].routeName === "Item";
    return (
      <View style={styles.header}>
        <View style={styles.primary}>
          <LeftHeader
            isActive={isActive}
            isItem={isItem}
            handleGoBack={this.handleGoBack}
          />
          <CenterHeader
            isActive={isActive}
            searchQuery={searchQuery}
            onChangeText={searchQuery => this.setState({ searchQuery })}
            onSubmitEditing={this.search}
            resetToHome={this.resetToHome}
            setRef={this.setSearchBarRef}
            onFocus={this.setActiveByFocus}
          />
        </View>
        <View style={styles.secondary}>
          <RightHeader setActive={this.setActive} />
        </View>
      </View>
    );
  }

  handleGoBack = () => {
    this.setState({
      isActive: false
    });
    this.props.navigation.goBack(null);
  };

  resetToHome = () => {
    this.setState({
      searchQuery: ""
    });
    this.props.searchRedux("");
    this.setInactive();
  };

  search = () => {
    this.props.searchRedux(this.state.searchQuery);
    this.setInactive();
  };

  setActive = async () => {
    await this.props.navigation.navigate("Search");
    this.setState({
      isActive: true
    });
  };

  setActiveByFocus = async () => {
    await this.props.navigation.navigate("Search");
    this.setState({
      isActive: true
    });
  };

  setInactive = async () => {
    await this.props.navigation.navigate("Home");
    this.setState({
      isActive: false
    });
  };
}

const mapStateToProps = state => ({
  searchQueryRedux: state.search.searchQuery
});

const mapDispatchToProps = dispatch => {
  return {
    searchRedux: (search_query, cap) =>
      dispatch(searchActions.search(search_query, cap)),
    setActiveRedux: isActive =>
      dispatch(searchActions.searchSetActive(isActive))
  };
};

export default withNavigation(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Header)
);
