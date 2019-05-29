import React, { Component } from "react";
import { View } from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import * as authActions from "../store/actions/auth";
import Button from "../components/Button";
import { Header1 } from "../components/Text";
import { AutoStart } from "../utils/constants";
import NavigatorService from "../navigator/NavigationService";
import { HiddenBar } from "../components/StatusBars";

let mounted = false;
export class AppLoader extends Component {
  componentDidMount() {
    this.props
      .autoLoginRedux()
      .then(() => NavigatorService.navigate("Home"))
      .catch(err => {
        if (err === AutoStart.anonymous) {
          NavigatorService.navigate("Main");
        } else if (err === AutoStart.firstTime) {
          NavigatorService.navigate("Home");
        }
      });
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <HiddenBar />
        <Button onPress={() => this.props.navigation.navigate("App")}>
          <Header1>Quipu</Header1>
        </Button>
      </View>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => {
  return {
    autoLoginRedux: (resolve, reject) =>
      dispatch(authActions.autoLogin(resolve, reject))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppLoader);
