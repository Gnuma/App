import React, { Component } from "react";
import { View, Text } from "react-native";
import { withNavigation } from "react-navigation";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Button from "../components/Button/Button";
import MainList from "../components/MainList/MainList";
import SearchResults from "../components/SearchResults/SearchResults";

export class Home extends Component {
  static propTypes = {
    results: PropTypes.array,
    isSearchActive: PropTypes.bool
  };

  getContent = () => {
    if (this.props.isSearchActive) return <SearchResults />;
    else if (this.props.results !== null)
      return <MainList data={this.props.results} />;
    else return <Text>Home</Text>;
  };

  render() {
    const content = this.getContent();
    return content;
  }
}

const mapStateToProps = state => ({
  isSearchActive: state.search.isActive,
  results: state.search.results
});

const mapDispatchToProps = {};

export default withNavigation(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Home)
);
