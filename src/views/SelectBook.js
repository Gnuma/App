import React, { Component } from "react";
import { View, Text } from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import SBHeader from "../components/MainSelectBook/SelectBookHeader";
import { bookList } from "../mockData/Book";
import SBList from "../components/MainSelectBook/SelectBookList";

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
        />
        <SBList results={bookList} handleSelection={this.handleSelection}/>
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
    this.props.navigation.navigate("Home");
  };
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectBook);
