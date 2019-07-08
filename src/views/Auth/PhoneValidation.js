import React, { Component } from "react";
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  StyleSheet
} from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { AndroidBackHandler } from "react-navigation-backhandler";
import Button from "../../components/Button";
import { Header1, Header3 } from "../../components/Text";
import Icon from "react-native-vector-icons/FontAwesome";
import { HiddenBar, GreyBar } from "../../components/StatusBars";
import PhonePicker from "../../components/PhonePicker";
import ContinueButton from "../../components/ContinueButton";
import * as authActions from "../../store/actions/auth";
import LoadingOverlay from "../../components/LoadingOverlay";
import { StackActions } from "react-navigation";
import { isInvalidPhone, getNumber } from "../../utils/validator";
import ErrorMessage from "../../components/Form/ErrorMessage";
import axios from "axios";
import { ___VALIDATE_USER___ } from "../../store/constants";
import { AUTH_ERROR, NOTCH_MARGIN } from "../../utils/constants";

export class PhoneValidation extends Component {
  static propTypes = {};

  constructor(props) {
    super(props);

    this._resolve = this.props.navigation.getParam("resolve", () => {});
    this._reject = this.props.navigation.getParam("reject", () => {});

    this.state = {
      phone: props.phone.toString(),
      status: 1,
      code: ["", "", "", "", "", ""],
      loading: false,
      error: ""
    };
  }

  changePhoneText = text => this.setState({ phone: text });

  changeCodeValue = code => this.setState({ code });

  goBack = () => {
    if (this.state.status === 0) {
      this._reject(AUTH_ERROR.SEMIAUTH);
      this.quit();
    } else {
      this.setState(prevState => ({
        status: Math.max(0, prevState.status - 1)
      }));
    }
    return true;
  };

  quit = () => {
    this.props.navigation.navigate("App");
  };

  canContinue = status => {
    if (status === 0) {
      return this.state.phone.length > 0;
    } else {
      let code = this.state.code.join("");
      code = code.replace(/\s/g, "");
      return code.length === CODE_LENGTH;
    }
  };

  continue = () => {
    let { status, phone, code } = this.state;
    if (status === 0) {
      //API
      if (isInvalidPhone(phone)) {
        this.setState({
          error: "Il numero inserito non sembra essere valido"
        });
        return;
      }
      phone = getNumber(phone);
      console.log(phone, isInvalidPhone(phone));
      this.setState({
        loading: true
      });
      setTimeout(() => {
        this.props.setPhone(phone);
        this.setState({
          loading: false,
          status: 1,
          code: ["", "", "", "", ""],
          phone,
          error: ""
        });
      }, 2000);
    } else {
      //API
      this.setState({
        loading: true
      });
      axios
        .post(___VALIDATE_USER___, {
          phone,
          key: code.join("")
        })
        .then(res => {
          this.props.validate().then(() => {
            this.setState({
              loading: false
            });
            this._resolve();
            this.quit();
          });
          console.log(res);
        })
        .catch(err => {
          console.log({ err });
          this.setState({
            loading: false,
            error: "Il codice inserito non è valido"
          });
        });
    }
  };

  render() {
    const { phone, status, code, loading, error } = this.state;

    return (
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior="padding"
        keyboardVerticalOffset={NOTCH_MARGIN}
      >
        <AndroidBackHandler style={{ flex: 1 }} onBackPress={this.goBack}>
          <HiddenBar />
          <View style={{ flex: 1, marginHorizontal: 20 }}>
            <View style={{ marginBottom: 10 }}>
              <View
                style={{
                  marginLeft: -10,
                  marginTop: 10,
                  flexDirection: "row",
                  alignItems: "center"
                }}
              >
                <Button
                  style={{
                    borderRadius: 6
                  }}
                  onPress={this.goBack}
                >
                  <Icon
                    name={this.state.status > 0 ? "chevron-left" : "times"}
                    size={32}
                    style={{ color: "black", padding: 10, borderRadius: 4 }}
                  />
                </Button>
                <Header1 color="primary">Conferma il numero</Header1>
              </View>
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <Header1
                  style={{ fontSize: 50, textAlign: "center" }}
                  color={"primary"}
                >
                  Quipu
                </Header1>
              </View>
            </View>
            <View style={{ flex: 1 }}>
              <ScrollView keyboardShouldPersistTaps="always">
                <PhonePicker
                  phone={phone}
                  status={status}
                  changePhoneText={this.changePhoneText}
                  code={code}
                  changeCodeValue={this.changeCodeValue}
                />
                {!!error && <ErrorMessage message={error} />}
              </ScrollView>
            </View>
            <ContinueButton
              text={"Verifica il numero"}
              containerStyle={{ marginVertical: 10 }}
              onPress={this.continue}
              disabled={!this.canContinue(status)}
            />
          </View>
        </AndroidBackHandler>
        {loading && (
          <View style={{ ...StyleSheet.absoluteFill, elevation: 10 }}>
            <LoadingOverlay />
          </View>
        )}
      </KeyboardAvoidingView>
    );
  }
}

const mapStateToProps = state => ({
  phone: state.auth.userData.phone
});

const mapDispatchToProps = dispatch => ({
  setPhone: phone => dispatch(authActions.authSetPhone(phone)),
  validate: () => dispatch(authActions.authValidateAccount())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PhoneValidation);

const CODE_LENGTH = 6;
