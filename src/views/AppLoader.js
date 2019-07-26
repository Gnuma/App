import React, { Component } from "react";
import { View } from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import * as authActions from "../store/actions/auth";
import * as settingsActions from "../store/actions/settings";
import Button from "../components/Button";
import { Header1 } from "../components/Text";
import { AutoStart } from "../utils/constants";
import NavigatorService from "../navigator/NavigationService";
import { HiddenBar } from "../components/StatusBars";
import Logo from "../Header/Logo";
import colors from "../styles/colors";

let mounted = false;
export class AppLoader extends Component {
  componentDidMount() {
    if (!mounted) {
      this.props.startSettings();
    }
    this.props
      .autoLoginRedux()
      .then(() => NavigatorService.navigate("Home"))
      .catch(err => {
        if (err === AutoStart.anonymous) {
          NavigatorService.navigate("Main");
        } else if (err === AutoStart.firstTime) {
          NavigatorService.navigate("InitProfile");
          //NavigatorService.navigate("Home");
        }
      });

    mounted = true;
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <HiddenBar />
        <Button onPress={() => this.props.navigation.navigate("App")}>
          <Logo color="black" />
        </Button>
      </View>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => {
  return {
    autoLoginRedux: (resolve, reject) =>
      dispatch(authActions.autoLogin(resolve, reject)),
    startSettings: () => dispatch(settingsActions.settingsStart())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppLoader);
