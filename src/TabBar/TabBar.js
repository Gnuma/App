import React, { Component } from "react";
import { View, Text } from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Button from "../components/Button";
import SellIcon from "../media/vectors/sell-icon";
import Icon from "react-native-vector-icons/FontAwesome";
import { Header4 } from "../components/Text";
import colors from "../styles/colors";

export class TabBar extends Component {
  static propTypes = {};

  render() {
    const { navigation } = this.props;

    return (
      <View
        style={{
          minHeight: 60,
          flexDirection: "row",
          backgroundColor: "white",
          elevation: 2
        }}
      >
        <Button
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          onPress={this._goHome}
        >
          <Icon name="search" size={27} style={{ marginBottom: 5 }} />
          <Header4>Esplora</Header4>
        </Button>
        <Button
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          onPress={this._goVendi}
        >
          <SellIcon style={{ marginBottom: 5 }} />
          <Header4>Vendi</Header4>
        </Button>
        <Button
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          onPress={this._goChat}
        >
          <Icon name="paper-plane" size={27} style={{ marginBottom: 5 }} />
          <Header4>Chat</Header4>
        </Button>
      </View>
    );
  }

  _goHome = () => {
    this.props.navigation.navigate("SEARCH");
  };
  _goVendi = () => {
    this.props.navigation.navigate("VENDI");
  };
  _goChat = () => {
    this.props.navigation.navigate("CHAT");
  };
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TabBar);