import React, { Component } from "react";
import { View, Text } from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import SBHeader from "../components/Sell/SelectBook/SelectBookHeader";
import { bookList } from "../mockData/Book";
import SBList from "../components/Sell/SelectBook/SelectBookList";
import * as sellActions from "../store/actions/sell";
import axios from "axios";
import { ___BOOK_HINTS_ENDPOINT___ } from "../store/constants";
import _ from "lodash";
import { GreyBar } from "../components/StatusBars";

export class SelectBook extends Component {
  state = {
    searchQuery: "",
    results: []
  };

  render() {
    const hasNoResults =
      _.isEmpty(this.state.results) && this.state.searchQuery;

    return (
      <View style={{ flex: 1 }}>
        <GreyBar />
        <SBHeader
          onChangeText={this.handleChange}
          searchQuery={this.state.searchQuery}
          resetSearchBar={this.resetSearchBar}
          handleGoBack={this.handleGoBack}
        />
        <SBList
          results={this.state.results}
          handleSelection={this.handleSelection}
          hasNoResults={hasNoResults}
          goCreateBook={this._goCreateBook}
        />
      </View>
    );
  }

  handleChange = text => {
    this.setState({
      searchQuery: text
    });
    if (text) {
      axios
        .post(___BOOK_HINTS_ENDPOINT___, { keyword: text })
        .then(res => {
          this.setState({ results: res.data.results });
        })
        .catch(err => {
          //console.log(err.response);
          this.setState({
            results: []
          });
        });
    }
  };

  _goCreateBook = () => {
    this.props.navigation.navigate("CreateBook");
  };

  resetSearchBar = () => this.handleChange("");

  handleSelection = isbn => {
    this.props.selectBookRedux(isbn);
    this.props.navigation.navigate("VendiInfos");
  };

  handleGoBack = () => {
    this.props.navigation.goBack(null);
  };
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => {
  return {
    selectBookRedux: book => dispatch(sellActions.selectBook(book))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectBook);
