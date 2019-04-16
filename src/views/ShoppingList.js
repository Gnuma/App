import React, { Component } from "react";
import { View, Text } from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Header3 } from "../components/Text";
import ShoppingTab from "../components/Shopping/ShoppingTab";

export class ShoppingList extends Component {
  static propTypes = {};

  render() {
    return (
      <View style={{ flex: 1 }}>
        <ShoppingTab data={tabMock} />
      </View>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShoppingList);

const tabMock = [
  {
    _id: 1,
    title: "Matematica"
  },
  {
    _id: 2,
    title: "Rosso"
  },
  {
    _id: 3,
    title: "Verde"
  },
  {
    _id: 4,
    title: "Quaddrotnomistma"
  }
];
