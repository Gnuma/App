import React, { Component } from "react";
import { View, ScrollView, TouchableWithoutFeedback } from "react-native";
import { withNavigation } from "react-navigation";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import MainList from "../components/List/MainList";
import SearchResults from "../components/SearchResults/SearchResults";
import * as searchActions from "../store/actions/search";
import BookShelf from "../components/Home/BookShelf";
import SearchLink from "../components/Home/SearchLink";
import { AndroidBackHandler } from "react-navigation-backhandler";
import { singleResults } from "../mockData/SearchResults";
import Button from "../components/Button";
import protectedAction from "../utils/protectedAction";
import NotificationCenter from "../components/Home/NotificationCenter";
import _ from "lodash";
import MainHome from "../components/Home/MainHome";

export class Home extends Component {
  static propTypes = {
    results: PropTypes.object,
    isSearchActive: PropTypes.bool,
    suggestions: PropTypes.array, // take out
    commentsData: PropTypes.object,
    commentsOrder: PropTypes.array,
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
        <MainList data={this.props.results} isLoading={this.props.isLoading} />
        //<MainList data={singleResults} isLoading={this.props.isLoading} />
      );
    } else {
      return (
        <MainHome
          openSearchBar={this._openSearchBar}
          commentsOrdered={this.props.commentsOrder}
          commentsData={this.props.commentsData}
          goComment={this._onCommentNotificationPress}
          searchOption={this._searchOption}
        />
      );
    }
  };

  _onCommentNotificationPress = (itemPK, book) => {
    this.props.navigation.navigate("Item", {
      itemID: itemPK,
      name: book.title,
      authors: book.authors
    });
  };

  _onBackButtonPressAndroid = () => {
    if (this.props.isSearchActive) {
      this.props.setActiveRedux(false);
      return true;
    } else if (this.props.showResults) {
      this.props.goHomeRedux();
      return true;
    }
    return false;
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
  isLoading: state.search.loading,
  notifications: state.notifications.notifications, //TAke out
  commentsData: state.comments.data,
  commentsOrder: state.comments.orderedData
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
