import React, { Component } from "react";
import { View } from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import * as authActions from "../../store/actions/auth";
import { Header1, Header3, Header2 } from "../../components/Text";
import Button from "../../components/Button";
import FormInput from "../../components/Form/TextInput";
import Icon from "react-native-vector-icons/FontAwesome";
import {
  submit,
  isEmpty,
  fieldCheck,
  isInvalidEmail
} from "../../utils/validator.js";
import Layout from "./AuthLayout";

export class Signup extends Component {
  static propTypes = {
    isAuthenticated: PropTypes.bool,
    isLoading: PropTypes.bool,
    signupRedux: PropTypes.func
  };

  constructor(props) {
    super(props);

    this._resolve = this.props.navigation.getParam("resolve", () => {});
    this._reject = this.props.navigation.getParam("reject", () => {});

    this.state = {
      fields: {
        uid: {
          value: "",
          errorMessage: ""
        },
        email: {
          value: "",
          errorMessage: ""
        },
        pwd: {
          value: "",
          errorMessage: ""
        },
        confirmPwd: {
          value: "",
          errorMessage: ""
        }
      }
    };

    validators.confirmPwd.functions.push(this.isDifferentPwd);
  }

  _renderTopSection = () => (
    <View
      style={{ flex: 2, justifyContent: "space-evenly", alignItems: "center" }}
    >
      <FormInput
        placeholder="Username"
        textContentType="username"
        value={this.state.fields.uid.value}
        errorMessage={this.state.fields.uid.errorMessage}
        onChangeText={this._uid_onChange}
        onSubmitEditing={this._uid_check}
      />
      <FormInput
        placeholder="Email"
        textContentType="emailAddress"
        value={this.state.fields.email.value}
        errorMessage={this.state.fields.email.errorMessage}
        onChangeText={this._email_onChange}
        onSubmitEditing={this._email_check}
      />
      <FormInput
        placeholder="Password"
        textContentType="password"
        value={this.state.fields.pwd.value}
        errorMessage={this.state.fields.pwd.errorMessage}
        onChangeText={this._pwd_onChange}
        onSubmitEditing={this._pwd_check}
        secureTextEntry={true}
      />
      <FormInput
        placeholder="Conferma Password"
        value={this.state.fields.confirmPwd.value}
        errorMessage={this.state.fields.confirmPwd.errorMessage}
        onChangeText={this._confirmPwd_onChange}
        onSubmitEditing={this._confirmPwd_check}
        secureTextEntry={true}
      />
      <Button
        style={{
          paddingVertical: 4,
          backgroundColor: "white",
          width: 200,
          elevation: 4,
          borderRadius: 6
        }}
        onPress={this.signup}
      >
        <Header2 color={"primary"} style={{ textAlign: "center" }}>
          Registrati
        </Header2>
      </Button>
    </View>
  );

  _renderBottomSection = () => {
    return (
      <View
        style={{ flex: 1.2, alignItems: "center", justifyContent: "center" }}
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
        <Button onPress={this._goLogin}>
          <Header3 color={"primary"}>Hai già un account?</Header3>
        </Button>
      </View>
    );
  };

  render() {
    if (this.props.isLoading) return <Header1>Loading</Header1>;
    return (
      <Layout
        renderTopSection={this._renderTopSection}
        renderBottomSection={this._renderBottomSection}
        canQuitAuth
        reject={this._reject}
      />
    );
  }

  _goLogin = () => {
    const params = this.props.navigation.state.params
      ? this.props.navigation.state.params
      : undefined;
    this.props.navigation.navigate("Login", params);
  };

  _uid_onChange = value => this.updateField("uid", { value, errorMessage: "" });

  _uid_check = () =>
    this.updateField("uid", fieldCheck(this.state.fields.uid, validators.uid));

  _email_onChange = value =>
    this.updateField("email", { value, errorMessage: "" });

  _email_check = () =>
    this.updateField(
      "email",
      fieldCheck(this.state.fields.email, validators.email)
    );

  _pwd_onChange = value => this.updateField("pwd", { value, errorMessage: "" });

  _pwd_check = () =>
    this.updateField("pwd", fieldCheck(this.state.fields.pwd, validators.pwd));

  _confirmPwd_onChange = value =>
    this.updateField("confirmPwd", { value, errorMessage: "" });

  _confirmPwd_check = () =>
    this.updateField(
      "confirmPwd",
      fieldCheck(this.state.fields.confirmPwd, validators.confirmPwd)
    );

  updateField = (key, newState) =>
    this.setState(prevState => ({
      ...prevState,
      fields: {
        ...prevState.fields,
        [key]: newState
      }
    }));

  signup = () => {
    const fields = this.state.fields;
    const result = submit(fields, validators);
    if (result === true) {
      const uid = fields.uid.value;
      const pwd = fields.pwd.value;
      const email = fields.email.value;
      const confirmPwd = fields.confirmPwd.value;

      this.props.signupRedux(uid, email, pwd, confirmPwd, this._resolve);
    } else {
      this.setState({
        fields: { ...result }
      });
    }
  };

  isDifferentPwd = confirmPwd => {
    const pwd =
      this.state.fields.pwd !== undefined ? this.state.fields.pwd.value : "";
    return pwd !== confirmPwd;
  };
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.token !== null,
  isLoading: state.auth.loading
});

const mapDispatchToProps = dispatch => {
  return {
    signupRedux: (uid, email, pwd1, pwd2, resolve) =>
      dispatch(authActions.authSignup(uid, email, pwd1, pwd2, resolve))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Signup);

const validators = {
  uid: {
    functions: [isEmpty],
    warnings: ["Inserisci il nome."]
  },
  email: {
    functions: [isEmpty, isInvalidEmail],
    warnings: ["Inserisci l'email.", "L'email non è valida."]
  },
  pwd: {
    functions: [isEmpty],
    warnings: ["Inserisci la password."]
  },
  confirmPwd: {
    functions: [isEmpty],
    warnings: ["Reinserisci la password.", "Le due password non coincidono."]
  }
};

/*
<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Header1>Registrati a GNUMA</Header1>
        <TextInput
          placeholder="Username"
          textContentType="username"
          onChangeText={value => this.handleChange("uid", value)}
        />
        <TextInput
          placeholder="Email"
          textContentType="emailAddress"
          onChangeText={value => this.handleChange("email", value)}
        />
        <TextInput
          placeholder="Password"
          textContentType="password"
          secureTextEntry={true}
          onChangeText={value => this.handleChange("pwd", value)}
        />
        <TextInput
          placeholder="Conferma Password"
          secureTextEntry={true}
          onChangeText={value => this.handleChange("confirmPwd", value)}
        />
        <Button
          style={{ backgroundColor: "red", marginBottom: 40 }}
          onPress={this.signup}
        >
          <Header1>Registrati</Header1>
        </Button>
        <Button onPress={() => this.props.navigation.navigate("Login")}>
          <Header1>oppure Accedi</Header1>
        </Button>
      </View>
      */
