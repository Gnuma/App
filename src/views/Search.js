//OUTDATED

import React, { Component } from "react";
import { View, Text } from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import SearchResults from "../components/SearchResults/SearchResults";

export class Search extends Component {
  render() {
    return <SearchResults suggestions={this.props.suggestions} />;
  }
}

const mapStateToProps = state => ({
  suggestions: state.search.suggestions
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search);
