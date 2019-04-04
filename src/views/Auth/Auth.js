import React, { Component } from "react";
import {
  View,
  Text,
  Platform,
  ScrollView,
  Keyboard,
  Animated
} from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Signup from "./Signup";
import Login from "./Login";
import { Header1, Header3 } from "../../components/Text";
import Button from "../../components/Button";
import Icon from "react-native-vector-icons/FontAwesome";
import { AndroidBackHandler } from "react-navigation-backhandler";
import * as authActions from "../../store/actions/auth";

export class Auth extends Component {
  constructor(props) {
    super(props);

    this._resolve = this.props.navigation.getParam("resolve", () => {});
    this._reject = this.props.navigation.getParam("reject", () => {});
  }

  static propTypes = {
    isLoading: PropTypes.bool,
    signupRedux: PropTypes.func,
    loginRedux: PropTypes.func
  };

  state = {
    authType: "signup",
    showFooter: true,
    status: 0
  };

  componentDidMount() {
    this.keyboardEventListeners = [
      Keyboard.addListener("keyboardDidShow", () =>
        this.setState({ showFooter: false })
      ),
      Keyboard.addListener("keyboardDidHide", () =>
        this.setState({ showFooter: true })
      )
    ];
  }

  componentWillUnmount() {
    this.keyboardEventListeners &&
      this.keyboardEventListeners.forEach(eventListener =>
        eventListener.remove()
      );
  }

  _goBack = () => {
    if (this.state.status <= 0) {
      this._reject();
      this.props.navigation.goBack(null);
      return true;
    } else {
      this.setState(prevState => ({
        status: prevState.status - 1
      }));
      return true;
    }
  };

  _goNext = () => {
    this.setState(prevState => ({
      status: prevState.status + 1
    }));
  };

  _switchAuthType = () =>
    this.setState(prevState => ({
      authType: prevState.authType === "signup" ? "login" : "signup",
      status: 0
    }));

  render() {
    const { signupRedux, loading, loginRedux } = this.props;
    const { authType } = this.state;

    return (
      <AndroidBackHandler onBackPress={this._goBack}>
        <View style={{ flex: 1, marginHorizontal: 20 }}>
          {loading ? <Header3>LOADING</Header3> : null}
          <Button
            style={{ position: "absolute", left: -16, top: 4, borderRadius: 6 }}
            onPress={this._goBack}
          >
            <Icon
              name={this.state.status > 0 ? "chevron-left" : "times"}
              size={32}
              style={{ color: "black", padding: 10, borderRadius: 4 }}
            />
          </Button>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              height: 150
            }}
          >
            <Header1 style={{ fontSize: 50 }} color={"primary"}>
              Quipu
            </Header1>
          </View>
          {authType === "signup" ? (
            <Signup
              signup={signupRedux}
              status={this.state.status}
              goNext={this._goNext}
              resolve={this._resolve}
            />
          ) : (
            <Login
              login={loginRedux}
              status={this.state.status}
              goNext={this._goNext}
              resolve={this._resolve}
            />
          )}
          {this._renderFooter()}
        </View>
      </AndroidBackHandler>
    );
  }

  _renderFooter = () => {
    if (!this.state.showFooter) return <View style={{ height: 10 }} />;

    return (
      <View
        style={{
          height: 200,
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <Header3>Oppure</Header3>
        <View
          style={{
            flexDirection: "row",
            width: 230,
            marginVertical: 10,
            justifyContent: "space-evenly"
          }}
        >
          <Button
            style={{
              width: 50,
              height: 50,
              backgroundColor: "#4285F4",
              elevation: 2,
              justifyContent: "center",
              borderRadius: 4
            }}
          >
            <Icon
              name="google"
              size={32}
              style={{ alignSelf: "center", color: "white" }}
            />
          </Button>
          <Button
            style={{
              width: 50,
              height: 50,
              backgroundColor: "#3B5998",
              elevation: 2,
              justifyContent: "center",
              borderRadius: 4
            }}
          >
            <Icon
              name="facebook"
              size={32}
              style={{ alignSelf: "center", color: "white" }}
            />
          </Button>
        </View>
        <Button onPress={this._switchAuthType}>
          <Header3 color={"primary"}>Hai già un account?</Header3>
        </Button>
      </View>
    );
  };
}

const mapStateToProps = state => ({
  isLoading: state.auth.loading
});

const mapDispatchToProps = dispatch => ({
  loginRedux: (uid, pwd, resolve) =>
    dispatch(authActions.authLogin(uid, pwd, resolve)),
  signupRedux: (uid, email, pwd1, pwd2, resolve) =>
    dispatch(authActions.authSignup(uid, email, pwd1, pwd2, resolve))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Auth);
