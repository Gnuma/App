import React, { Component } from "react";
import { View } from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import * as authActions from "../../store/actions/auth";
import { Header1 } from "../../components/Text";
import Button from "../../components/Button";
import TextInput from "../../components/TextInput";
import { submit, isEmpty } from "../../utils/validator.js";

export class Login extends Component {
  static propTypes = {
    isAuthenticated: PropTypes.bool,
    isLoading: PropTypes.bool,
    logoutRedux: PropTypes.func,
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

  render() {
    if (this.props.isAuthenticated) {
      return (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Header1>Hai già completato l'accesso</Header1>
          <Button onPress={this.props.logoutRedux}>
            <Header1>Esci</Header1>
          </Button>
        </View>
      );
    }

    if (this.props.isLoading) return <Header1>Loading</Header1>;

    return (
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
    );
  }

  handleChange = (id, value) => {
    this.setState(prevState => ({
      fields: {
        ...prevState.fields,
        [id]: {
          ...prevState.fields[id],
          value: value
        }
      }
    }));
  };

  login = () => {
    const fields = this.state.fields;
    const result = submit(fields, validators);
    if (result === true) {
      const uid = fields.uid.value;
      const pwd = fields.pwd.value;
      this.props.loginRedux(uid, pwd);
    } else {
      this.setState({
        fields: { ...result }
      });
    }
  };
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.token !== null,
  isLoading: state.auth.loading
});

const mapDispatchToProps = dispatch => {
  return {
    loginRedux: (uid, pwd) => dispatch(authActions.authLogin(uid, pwd)),
    logoutRedux: () => dispatch(authActions.authLogout())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);

const validators = {
  uid: {
    functions: [isEmpty],
    warnings: ["Inserisci l'email o il nome utente."]
  },
  pwd: {
    functions: [isEmpty],
    warnings: ["Inserisci la password"]
  }
};
