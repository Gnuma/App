import React, { Component } from "react";
import { View, ScrollView } from "react-native";
import { withNavigation } from "react-navigation";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import MainList from "../components/List/MainList";
import { Header1, Header3 } from "../components/Text";
import SearchResults from "../components/SearchResults/SearchResults";
import * as searchActions from "../store/actions/search";
import BookShelf from "../components/Home/BookShelf";
import SearchLink from "../components/Home/SearchLink";
import { AndroidBackHandler } from "react-navigation-backhandler";
import { singleResults } from "../mockData/SearchResults";
import Button from "../components/Button";

export class Home extends Component {
  static propTypes = {
    results: PropTypes.object,
    isSearchActive: PropTypes.bool,
    suggestions: PropTypes.array,
    searchRedux: PropTypes.func,
    showResults: PropTypes.bool,
    isLoading: PropTypes.bool
  };

  render() {
    return (
      <AndroidBackHandler onBackPress={this._onBackButtonPressAndroid}>
        {this.getContent()}
      </AndroidBackHandler>
    );
  }

  getContent = () => {
    if (this.props.isSearchActive) {
      return (
        <SearchResults
          searchRedux={this.props.searchRedux}
          suggestions={this.props.suggestions}
        />
      );
    } else if (this.props.showResults) {
      return (
        //<MainList data={this.props.results} isLoading={this.props.isLoading} />
        <MainList data={singleResults} isLoading={this.props.isLoading} />
      );
    } else {
      return (
        <ScrollView
          contentContainerStyle={{ flex: 1, justifyContent: "center" }}
        >
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
          <View>
            <Button
              onPress={() =>
                this.props.navigation.navigate("Item", { goToComment: 1 })
              }
            >
              <Header3>Go to comment in item</Header3>
            </Button>
          </View>
        </ScrollView>
      );
    }
  };

  _onBackButtonPressAndroid = () => {
    if (this.props.isSearchActive) {
      this.props.setActiveRedux(false);
      return true;
    } else if (this.props.showResults) {
      this.props.goHomeRedux();
      return true;
    }
    return true;
  };

  _openSearchBar = () => {
    this.props.setActiveRedux(true);
  };

  _searchOption = search_query => {
    this.props.searchRedux(search_query);
  };
}

const mapStateToProps = state => ({
  isSearchActive: state.search.isActive,
  results: state.search.results,
  suggestions: state.search.suggestions,
  showResults: state.search.showResults,
  isLoading: state.search.loading
});

const mapDispatchToProps = dispatch => {
  return {
    searchRedux: (search_query, cap) =>
      dispatch(searchActions.search(search_query, cap)),
    setActiveRedux: isActive =>
      dispatch(searchActions.searchSetActive(isActive)),
    goHomeRedux: () => dispatch(searchActions.searchGoHome())
  };
};

export default withNavigation(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Home)
);
