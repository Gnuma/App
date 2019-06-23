import React, { Component } from "react";
import { View, Keyboard } from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import BasicHeader from "../../components/BasicHeader";
import SolidButton from "../../components/SolidButton";
import { Header2 } from "../../components/Text";
import UserInfoForm from "../../components/UserSettings/UserInfoForm";
import { isEmpty, isInvalidEmail, submit } from "../../utils/validator";
import update from "immutability-helper";

export class UserInfo extends Component {
  static propTypes = {};
  constructor(props) {
    super(props);
    this.state = {
      fields: {
        uid: { value: "FakeTest", errorMessage: "" },
        email: { value: "Fake@test.com", errorMessage: "" }
        //office: { value: "", errorMessage: "" },
      }
    };

    this.initialFields = this.state.fields;
  }

  save = () => {
    Keyboard.dismiss();
    const result = submit(this.state.fields, this.validators);
    if (result === true) {
    } else {
      this.setState(prevState =>
        update(prevState, {
          fields: { $set: result }
        })
      );
    }
  };

  updateField = (key, value) => {
    this.setState(prevState =>
      update(prevState, {
        fields: {
          [key]: { $set: { value, errorMessage: "" } }
        }
      })
    );
  };

  render() {
    const { fields } = this.state;

    return (
      <View style={{ flex: 1 }}>
        <BasicHeader title="Modifica" />
        <View style={{ flex: 1, paddingHorizontal: 20, paddingTop: 10 }}>
          <UserInfoForm
            updateField={this.updateField}
            fields={fields}
            initialFields={this.initialFields}
          />
        </View>
        <SaveButton save={this.save} />
      </View>
    );
  }

  validators = {
    uid: {
      functions: [isEmpty],
      warnings: ["Inserisci il nome"]
    },
    email: {
      functions: [isEmpty, isInvalidEmail],
      warnings: ["Inserisci l'email", "L'email non è valida"]
    }
  };
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserInfo);

const SaveButton = ({ save }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        paddingVertical: 10,
        paddingHorizontal: 20
      }}
    >
      <SolidButton style={{ flex: 1 }} onPress={save}>
        <Header2 style={{ flex: 1, textAlign: "center" }} color="black">
          Salva
        </Header2>
      </SolidButton>
    </View>
  );
};
