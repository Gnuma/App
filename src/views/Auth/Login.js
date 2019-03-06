import React, { Component } from "react";
import { View } from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import * as authActions from "../../store/actions/auth";
import { Header1, Header3, Header2 } from "../../components/Text";
import Button from "../../components/Button";
import { submit, fieldCheck, isEmpty } from "../../utils/validator.js";
import FormInput from "../../components/Form/TextInput";
import Layout from "./AuthLayout";

export class Login extends Component {
  static propTypes = {
    isAuthenticated: PropTypes.bool,
    isLoading: PropTypes.bool,
    loginRedux: PropTypes.func
  };

  state = {
    fields: {
      uid: {
        value: "",
        errorMessage: ""
      },
      pwd: {
        value: "",
        errorMessage: ""
      }
    }
  };

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
        placeholder="Password"
        textContentType="password"
        value={this.state.fields.pwd.value}
        errorMessage={this.state.fields.pwd.errorMessage}
        onChangeText={this._pwd_onChange}
        onSubmitEditing={this._pwd_check}
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
        onPress={this.login}
      >
        <Header2 color={"primary"} style={{ textAlign: "center" }}>
          Accedi
        </Header2>
      </Button>
    </View>
  );

  _renderBottomSection = () => {
    return <View style={{ flex: 1.2 }} />;
  };

  render() {
    if (this.props.isLoading) return <Header1>Loading</Header1>;
    return (
      <Layout
        renderTopSection={this._renderTopSection}
        renderBottomSection={this._renderBottomSection}
      />
    );
  }

  _uid_onChange = value => this.updateField("uid", { value, errorMessage: "" });

  _uid_check = () =>
    this.updateField("uid", fieldCheck(this.state.fields.uid, validators.uid));

  _pwd_onChange = value => this.updateField("pwd", { value, errorMessage: "" });

  _pwd_check = () =>
    this.updateField("pwd", fieldCheck(this.state.fields.pwd, validators.pwd));

  updateField = (key, newState) =>
    this.setState(prevState => ({
      ...prevState,
      fields: {
        ...prevState.fields,
        [key]: newState
      }
    }));

  login = () => {
    const fields = this.state.fields;
    const result = submit(fields, validators);
    if (result === true) {
      const uid = fields.uid.value;
      const pwd = fields.pwd.value;

      const _callback = this.props.navigation.getParam(
        "___CALLBACK___",
        undefined
      );

      this.props.loginRedux(uid, pwd, _callback);
    } else {
      this.setState(prevState => ({
        ...prevState,
        fields: { ...result }
      }));
    }
  };
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.token !== null,
  isLoading: state.auth.loading
});

const mapDispatchToProps = dispatch => {
  return {
    loginRedux: (uid, pwd, callback, nextRoute, params) =>
      dispatch(authActions.authLogin(uid, pwd, callback, nextRoute, params))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);

const validators = {
  uid: {
    functions: [isEmpty],
    warnings: ["Inserisci l'email o username"]
  },
  pwd: {
    functions: [isEmpty],
    warnings: ["Inserisci la password"]
  }
};

/*
 <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Header1>Accedi a GNUMA</Header1>
        <TextInput
          placeholder="Username"
          textContentType="username"
          onChangeText={value => this.handleChange("uid", value)}
        />
        <TextInput
          placeholder="Password"
          textContentType="password"
          secureTextEntry={true}
          onChangeText={value => this.handleChange("pwd", value)}
        />
        <Button
          style={{ backgroundColor: "red", marginBottom: 40 }}
          onPress={this.login}
        >
          <Header1>Accedi</Header1>
        </Button>
        <Button onPress={() => this.props.navigation.navigate("Signup")}>
          <Header1>oppure Registrati</Header1>
        </Button>
      </View>
      */
