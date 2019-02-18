import React, { Component } from "react";
import { View } from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import * as authActions from "../../store/actions/auth";
import { Header1 } from "../../components/Text";
import Button from "../../components/Button";
import TextInput from "../../components/TextInput";
import { submit, isEmpty, isInvalidEmail } from "../../utils/validator.js";

export class Signup extends Component {
  static propTypes = {
    isAuthenticated: PropTypes.bool,
    isLoading: PropTypes.bool,
    logoutRedux: PropTypes.func,
    signupRedux: PropTypes.func
  };

  constructor(props) {
    super(props);

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

  signup = () => {
    const fields = this.state.fields;
    const result = submit(fields, validators);
    if (result === true) {
      const uid = fields.uid.value;
      const pwd = fields.pwd.value;
      const email = fields.email.value;
      const confirmPwd = fields.confirmPwd.value;
      this.props.signupRedux(uid, pwd, email, confirmPwd);
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
    signupRedux: (uid, email, pwd1, pwd2) =>
      dispatch(authActions.authSignup(uid, email, pwd1, pwd2)),
    logoutRedux: () => dispatch(authActions.authLogout())
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
