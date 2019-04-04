import React, { Component } from "react";
import { View, ToastAndroid } from "react-native";
import OutlinedInput from "../../components/Form/OutlinedInput";
import {
  submit,
  isEmpty,
  fieldCheck,
  isInvalidEmail
} from "../../utils/validator.js";
import Button from "../../components/Button";
import { Header3, Header2, Header1 } from "../../components/Text";
import SolidButton from "../../components/SolidButton";
export default class Signup extends Component {
  constructor(props) {
    super(props);

    validators[2].confirmPwd.functions.push(this.isDifferentPwd);
  }

  state = {
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
    const { status } = this.props;
    const stateFields = this.state.fields[status];
    const stateValidators = validators[status];

    const result = submit(stateFields, stateValidators);
    if (result === true) {
      if (status !== 2) {
        this.props.goNext();
      } else {
        const { fields } = this.state;
        const uid = fields[0].uid.value;
        const email = fields[1].email.value;
        const pwd = fields[2].pwd.value;
        const confirmPwd = fields[2].confirmPwd.value;

        this.props.signup(uid, email, pwd, confirmPwd, this.props.resolve);
      }
    } else {
      this.setState(prevState => ({
        fields: { ...prevState.fields, [status]: { ...result } }
      }));

      let errorList = "";
      for (var key in result) {
        if (result.hasOwnProperty(key)) {
          if (result[key].errorMessage) {
            if (errorList) errorList += "\n";
            errorList += result[key].errorMessage;
          }
        }
      }
      ToastAndroid.showWithGravity(
        errorList,
        ToastAndroid.LONG,
        ToastAndroid.CENTER
      );
    }
  };

  handleChange = (key, value) => {
    this.updateField(key, { value, errorMessage: "" });
  };

  checkField = (key, goNext) => {
    const newState = fieldCheck(
      this.state.fields[this.props.status][key],
      validators[this.props.status][key]
    );
    this.updateField(key, newState, goNext);
  };

  updateField = (key, newState, goNext = false) => {
    const status = this.props.status;
    this.setState(
      prevState => ({
        ...prevState,
        fields: {
          ...prevState.fields,
          [status]: {
            ...prevState.fields[status],
            [key]: newState
          }
        }
      }),
      () => {
        if (goNext) this.continue();
      }
    );
  };

  _renderUsername = () => (
    <OutlinedInput
      placeholder="Username"
      textContentType="username"
      value={this.state.fields[0].uid.value}
      onTextChange={text => this.handleChange("uid", text)}
      onSubmitEditing={() => this.checkField("uid", true)}
    />
  );
  _renderEmail = () => (
    <OutlinedInput
      placeholder="Email"
      textContentType="emailAddress"
      value={this.state.fields[1].email.value}
      onTextChange={text => this.handleChange("email", text)}
      onSubmitEditing={() => this.checkField("email", true)}
      autoFocus
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
        autoFocus
      />
      <OutlinedInput
        placeholder="Conferma Password"
        value={this.state.fields[2].confirmPwd.value}
        onTextChange={text => this.handleChange("confirmPwd", text)}
        onSubmitEditing={() => this.checkField("confirmPwd", true)}
        secureTextEntry={true}
      />
    </View>
  );

  _getContent = () => {
    switch (this.props.status) {
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
    const { status } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Header1 color="primary" style={{ marginBottom: 15 }}>
            Registrati
          </Header1>
          {this._getContent()}
          <View style={{ flex: 1, justifyContent: "flex-end" }}>
            <SolidButton onPress={this.continue} style={{ width: 180 }}>
              <Header3 color={"primary"}>
                {status === 2 ? "Registrati" : "Continua"}
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
