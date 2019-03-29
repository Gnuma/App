import React, { Component } from "react";
import { View } from "react-native";
import { Header1 } from "../../components/Text";
import PropTypes from "prop-types";
import Button from "../../components/Button";
import Icon from "react-native-vector-icons/FontAwesome";
import NavigationService from "../../navigator/NavigationService";

export default class AuthLayout extends Component {
  static propTypes = {
    renderTopSection: PropTypes.func,
    renderBottomSection: PropTypes.func
  };
  render() {
    const { renderTopSection, renderBottomSection, canQuitAuth } = this.props;
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Button
          style={{ position: "absolute", left: 0, top: 0 }}
          onPress={this._goBack}
        >
          <Icon
            name={canQuitAuth ? "times" : "arrow-left"}
            size={32}
            style={{ color: "black", padding: 10 }}
          />
        </Button>
        <View style={{ flex: 1, justifyContent: "center" }}>
          <Header1 style={{ fontSize: 50 }} color={"primary"}>
            Quipu
          </Header1>
        </View>
        {renderTopSection()}
        {renderBottomSection()}
      </View>
    );
  }

  _goBack() {
    this.props.reject();
    NavigationService.goBack(null);
  }
}
