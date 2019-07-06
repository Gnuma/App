import React, { Component } from "react";
import { View, Text, ScrollView } from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import BasicHeader from "../../components/BasicHeader";
import PhonePicker from "../../components/PhonePicker";
import SolidButton from "../../components/SolidButton";
import { Header3 } from "../../components/Text";
import { AndroidBackHandler } from "react-navigation-backhandler";
import { StackActions, NavigationActions } from "react-navigation";

export class PhoneChange extends Component {
  static propTypes = {};

  constructor(props) {
    super(props);
    this.state = {
      phone: "34142565675",
      status: 1,
      code: ["", "", "", "", ""]
    };
  }

  continue = () => {
    this.setState(prevState => ({
      status: prevState.status + 1
    }));
  };

  changePhoneText = text => this.setState({ phone: text });

  changeCodeValue = code => this.setState({ code });

  goBack = () => {
    if (this.state.status === 0) {
      this.props.navigation.goBack(null);
    } else {
      this.setState(prevState => ({
        status: Math.max(0, prevState.status - 1)
      }));
    }
    return true;
  };

  render() {
    const { phone, status, code } = this.state;
    return (
      <AndroidBackHandler onBackPress={this.goBack}>
        <View style={{ flex: 1 }}>
          <BasicHeader title="Modifica il numero" goBack={this.goBack} />
          <View style={{ flex: 1, marginHorizontal: 20 }}>
            <ScrollView keyboardShouldPersistTaps="always">
              <PhonePicker
                phone={phone}
                status={status}
                changePhoneText={this.changePhoneText}
                code={code}
                changeCodeValue={this.changeCodeValue}
              />
            </ScrollView>
          </View>
          <ContinueButton
            onPress={this.continue}
            text={status == 0 ? "Invia codice di verifica" : "Verifica"}
          />
        </View>
      </AndroidBackHandler>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PhoneChange);

const ContinueButton = ({ onPress, text, disabled }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        paddingVertical: 10,
        paddingHorizontal: 20
      }}
    >
      <SolidButton style={{ flex: 1 }} onPress={onPress} disabled={disabled}>
        <Header3
          style={{ flex: 1, textAlign: "center" }}
          color={disabled ? "black" : "secondary"}
        >
          {text}
        </Header3>
      </SolidButton>
    </View>
  );
};
