import React, { Component } from "react";
import { View, Text, Button } from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";

export class Home extends Component {

  render() {
    return (
      <View>
        <Text> Home </Text>
        <Button
          onPress={() => {
            this.props.navigation.navigate("Item");
          }}
          title="Vai A Libro"
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
