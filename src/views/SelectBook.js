import React, { Component } from "react";
import { View, Text } from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import SBHeader from "../components/Sell/SelectBook/SelectBookHeader";
import { bookList } from "../mockData/Book";
import SBList from "../components/Sell/SelectBook/SelectBookList";
import * as sellActions from "../store/actions/sell";

export class SelectBook extends Component {
  state = {
    searchQuery: ""
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <SBHeader
          onChangeText={this.handleChange}
          searchQuery={this.state.searchQuery}
          resetSearchBar={this.resetSearchBar}
          handleGoBack={this.handleGoBack}
        />
        <SBList results={bookList} handleSelection={this.handleSelection} />
      </View>
    );
  }

  handleChange = ({ text }) => {
    this.setState({
      searchQuery: text
    });
  };

  resetSearchBar = () => {
    this.setState({
      searchQuery: ""
    });
  };

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
