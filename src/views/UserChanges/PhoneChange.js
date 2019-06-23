import React, { Component } from "react";
import { View, Text } from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import BasicHeader from "../../components/BasicHeader";

export class PhoneChange extends Component {
  static propTypes = {};

  render() {
    return (
      <View>
        <BasicHeader title="Modifica il numero" />
        <Text> prop </Text>
      </View>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PhoneChange);
