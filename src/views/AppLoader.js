import React, { Component } from "react";
import { View } from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import * as authActions from "../store/actions/auth";
import * as msgActions from "../store/actions/messaging";
import Button from "../components/Button";
import { Header1 } from "../components/Text";

export class AppLoader extends Component {
  componentDidMount() {
    this.props.autoLoginRedux();
    this.props.msgConnectRedux(1);
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Button onPress={() => this.props.navigation.navigate("App")}>
          <Header1>Gnuma</Header1>
        </Button>
      </View>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => {
  return {
    autoLoginRedux: () => dispatch(authActions.autoLogin()),
    msgConnectRedux: userID => dispatch(msgActions.connect(userID))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppLoader);
