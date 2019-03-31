import React, { Component } from "react";
import { View, Text, Platform, ScrollView, Keyboard } from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Signup from "./Signup";
import Login from "./Login";
import { Header1, Header3 } from "../../components/Text";
import Button from "../../components/Button";
import Icon from "react-native-vector-icons/FontAwesome";

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
    keyboardVisible: false
  };

  componentDidMount() {
    this.keyboardEventListeners = [
      Keyboard.addListener("keyboardDidShow", () =>
        this.setState({ keyboardVisible: true })
      ),
      Keyboard.addListener("keyboardDidHide", () =>
        this.setState({ keyboardVisible: false })
      )
    ];
  }

  _goBack = () => {
    this.props.reject();
    NavigationService.goBack(null);
  };

  _switchAuthType = () =>
    this.setState(prevState => ({
      authType: prevState.authType === "signup" ? "login" : "signup"
    }));

  render() {
    const { signupRedux, loading, loginRedux } = this.props;
    const { authType } = this.state;

    return (
      <View style={{ flex: 1 }}>
        {loading ? <Header3>LOADING</Header3> : null}
        <Button
          style={{ position: "absolute", left: 4, top: 4 }}
          onPress={this._goBack}
        >
          <Icon
            name={"times"}
            size={32}
            style={{ color: "black", padding: 10, borderRadius: 4 }}
          />
        </Button>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            height: 120
          }}
        >
          <Header1 style={{ fontSize: 50 }} color={"primary"}>
            Quipu
          </Header1>
        </View>
        {authType === "signup" ? (
          <Signup signup={signupRedux} />
        ) : (
          <Login login={loginRedux} />
        )}
        {this._renderFooter()}
      </View>
    );
  }

  _renderFooter = () => {
    if (this.state.keyboardVisible) return null;
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

const mapDispatchToProps = {
  loginRedux: (uid, pwd, resolve) =>
    dispatch(authActions.authLogin(uid, pwd, resolve)),
  signupRedux: (uid, email, pwd1, pwd2, resolve) =>
    dispatch(authActions.authSignup(uid, email, pwd1, pwd2, resolve))
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Auth);
