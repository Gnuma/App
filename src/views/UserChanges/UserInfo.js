import React, { Component } from "react";
import { View, Keyboard, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import BasicHeader from "../../components/BasicHeader";
import SolidButton from "../../components/SolidButton";
import { Header2 } from "../../components/Text";
import UserInfoForm from "../../components/UserSettings/UserInfoForm";
import {
  isEmpty,
  isInvalidEmail,
  submit,
  isEmailTaken,
  isUsernameTaken
} from "../../utils/validator";
import update from "immutability-helper";
import FullButton from "../../components/FullButton";
import colors from "../../styles/colors";
import axios from "axios";
import { ___MODIFY_USER___ } from "../../store/constants";
import LoadingOverlay from "../../components/LoadingOverlay";

export class UserInfo extends Component {
  static propTypes = {};
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      fields: {
        uid: { value: props.userData.username, errorMessage: "" },
        email: { value: props.userData.email, errorMessage: "" }
      }
    };

    this.initialFields = this.state.fields;
  }

  save = async () => {
    Keyboard.dismiss();
    this.setState({
      loading: true
    });
    const result = await submit(this.state.fields, this.validators);
    if (result === true) {
      const username =
        this.initialFields.uid.value !== this.state.fields.uid.value
          ? this.state.fields.uid.value
          : undefined;
      const email =
        this.initialFields.email.value !== this.state.fields.email.value
          ? this.state.fields.email.value
          : undefined;
      axios
        .post(___MODIFY_USER___, {
          username,
          email
        })
        .then(res => {
          console.log(res);
          this.props.navigation.goBack(null);
        })
        .catch(err => {
          console.log({ err });
          this.setState({ loading: false });
        });
    } else {
      this.setState(prevState =>
        update(prevState, {
          fields: { $set: result },
          loading: { $set: false }
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

  canSave = () =>
    this.initialFields.uid.value !== this.state.fields.uid.value ||
    this.initialFields.email.value !== this.state.fields.email.value;

  render() {
    const { fields, loading } = this.state;

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
        <SaveButton save={this.save} active={this.canSave()} />
        {loading && (
          <View style={{ ...StyleSheet.absoluteFill, elevation: 10 }}>
            <LoadingOverlay />
          </View>
        )}
      </View>
    );
  }

  validators = {
    uid: {
      functions: [isEmpty, isUsernameTaken],
      warnings: [
        "Inserisci il nome",
        "Questo username è già usato per un'altro account"
      ]
    },
    email: {
      functions: [isEmpty, isInvalidEmail, isEmailTaken],
      warnings: [
        "Inserisci l'email",
        "L'email non è valida",
        "Questa email è già usata per un'altro account"
      ]
    }
  };
}

const mapStateToProps = state => ({
  userData: state.auth.userData
});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserInfo);

const SaveButton = ({ save, active }) => {
  console.log(active);
  return (
    <View
      style={{
        paddingVertical: 10,
        paddingHorizontal: 20
      }}
    >
      <FullButton
        onPress={save}
        value="Salva"
        icon="pencil"
        iconStyle={{
          color: active ? colors.white : colors.black
        }}
        contentStyle={{
          flex: 1,
          textAlign: "center",
          color: active ? colors.white : colors.black
        }}
        color={active ? "secondary" : "white"}
        disabled={!active}
      />
    </View>
  );
};
