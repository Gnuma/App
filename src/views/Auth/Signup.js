import React, { Component } from "react";
import {
  View,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView
} from "react-native";
import OutlinedInput from "../../components/Form/OutlinedInput";
import {
  submit,
  isEmpty,
  fieldCheck,
  isInvalidEmail
} from "../../utils/validator.js";
import Button from "../../components/Button";
import { Header3 } from "../../components/Text";
import SolidButton from "../../components/SolidButton";

export default class Signup extends Component {
  constructor(props) {
    super(props);

    validators[2].confirmPwd.functions.push(this.isDifferentPwd);
  }

  state = {
    status: 0,
    fields: {
      0: {
        uid: {
          value: "",
          errorMessage: ""
        }
      },
      1: {
        email: {
          value: "",
          errorMessage: ""
        }
      },
      2: {
        pwd: {
          value: "",
          errorMessage: ""
        },
        confirmPwd: {
          value: "",
          errorMessage: ""
        }
      }
    }
  };

  continue = () => {
    const { status } = this.state;
    const stateFields = this.state.fields[status];
    const stateValidators = validators[status];

    const result = submit(stateFields, stateValidators);
    if (result === true) {
      if (status !== 2) {
        this.setState(prevState => ({
          status: prevState.status + 1
        }));
      } else {
        console.log("DONE");
      }
    } else {
      this.setState(prevState => ({
        fields: { ...prevState.fields, [status]: { ...result } }
      }));
    }
  };

  handleChange = (key, value) => {
    this.updateField(key, { value, errorMessage: "" });
  };

  checkField = key => {
    this.updateField(
      key,
      fieldCheck(
        this.state.fields[this.state.status][key],
        validators[this.state.status][key]
      )
    );
  };

  updateField = (key, newState) =>
    this.setState(prevState => ({
      ...prevState,
      fields: {
        ...prevState.fields,
        [prevState.status]: {
          ...prevState.fields[prevState.status],
          [key]: newState
        }
      }
    }));

  _renderUsername = () => (
    <OutlinedInput
      placeholder="Username"
      textContentType="username"
      value={this.state.fields[0].uid.value}
      onTextChange={text => this.handleChange("uid", text)}
      onSubmitEditing={() => this.checkField("uid")}
    />
  );
  _renderEmail = () => (
    <OutlinedInput
      placeholder="Email"
      textContentType="emailAddress"
      value={this.state.fields[1].email.value}
      onTextChange={text => this.handleChange("email", text)}
      onSubmitEditing={() => this.checkField("email")}
    />
  );
  _renderPwd = () => (
    <View
      style={{ flex: 1, justifyContent: "flex-start", alignItems: "center" }}
    >
      <OutlinedInput
        placeholder="Password"
        textContentType="password"
        value={this.state.fields[2].pwd.value}
        onTextChange={text => this.handleChange("pwd", text)}
        onSubmitEditing={() => this.checkField("pwd")}
        secureTextEntry={true}
      />
      <OutlinedInput
        placeholder="Conferma Password"
        value={this.state.fields[2].confirmPwd.value}
        onTextChange={text => this.handleChange("confirmPwd", text)}
        onSubmitEditing={() => this.checkField("confirmPwd")}
        secureTextEntry={true}
      />
    </View>
  );

  _getContent = () => {
    switch (this.state.status) {
      case 0:
        return this._renderUsername();
      case 1:
        return this._renderEmail();
      case 2:
        return this._renderPwd();
      default:
        return null;
    }
  };

  render() {
    const { status } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          {this._getContent()}
          <View style={{ flex: 1, justifyContent: "flex-end" }}>
            <SolidButton onPress={this.continue} style={{ width: 180 }}>
              <Header3 color={"primary"}>
                {this.status === 2 ? "Registrati" : "Continua"}
              </Header3>
            </SolidButton>
          </View>
        </View>
      </View>
    );
  }

  isDifferentPwd = confirmPwd => {
    const pwd =
      this.state.fields[2].pwd !== undefined
        ? this.state.fields[2].pwd.value
        : "";
    console.log(pwd, confirmPwd);
    return pwd !== confirmPwd;
  };
}

const validators = {
  0: {
    uid: {
      functions: [isEmpty],
      warnings: ["Inserisci il nome."]
    }
  },
  1: {
    email: {
      functions: [isEmpty, isInvalidEmail],
      warnings: ["Inserisci l'email.", "L'email non è valida."]
    }
  },
  2: {
    pwd: {
      functions: [isEmpty],
      warnings: ["Inserisci la password."]
    },
    confirmPwd: {
      functions: [isEmpty],
      warnings: ["Reinserisci la password.", "Le due password non coincidono."]
    }
  }
};
