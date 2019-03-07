import React, { Component } from "react";
import { View } from "react-native";
import { withNavigation } from "react-navigation";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import MainList from "../components/MainList/MainList";
import { Header1 } from "../components/Text";
import SearchResults from "../components/SearchResults/SearchResults";
import * as searchActions from "../store/actions/search";
import BookShelf from "../components/MainHome/BookShelf";
import SearchLink from "../components/MainHome/SearchLink";

export class Home extends Component {
  static propTypes = {
    results: PropTypes.object,
    isSearchActive: PropTypes.bool,
    suggestions: PropTypes.array,
    searchRedux: PropTypes.func
  };

  getContent = () => {
    if (this.props.isSearchActive) {
      return (
        <SearchResults
          searchRedux={this.props.searchRedux}
          suggestions={this.props.suggestions}
        />
      );
    } else if (this.props.results !== null) {
      return <MainList data={this.props.results} />;
    } else {
      return (
        <View style={{ flex: 1, justifyContent: "center" }}>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              paddingVertical: 30
            }}
          >
            <SearchLink onPress={this._openSearchBar} />
          </View>
          <BookShelf onPress={this._searchOption} />
        </View>
      );
    }
  };

  _openSearchBar = () => {
    this.props.setActiveRedux(true);
  };

  _searchOption = search_query => {
    this.props.searchRedux(search_query);
  };

  render() {
    return this.getContent();
  }
}

const mapStateToProps = state => ({
  isSearchActive: state.search.isActive,
  results: state.search.results,
  suggestions: state.search.suggestions
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
  )(Home)
);
