import React, { Component } from "react";
import { View, Text, ScrollView } from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import OfficePicker, { canStateContinue } from "../../components/OfficePicker";
import BasicHeader from "../../components/BasicHeader";
import SolidButton from "../../components/SolidButton";
import { Header2, Header3 } from "../../components/Text";
import { AndroidBackHandler } from "react-navigation-backhandler";

export class OfficeChange extends Component {
  static propTypes = {};

  state = {
    status: 0, //0: office, 1: course | class, 2: year,
    office: {
      name: "Liceo Classico Giulio Cesare",
      address: "Via dell'uno",
      type: "school",
      id: 5
    },
    course: {},
    year: undefined
  };

  setItem = (key, value) => {
    this.setState({
      [key]: value
    });
  };

  continue = () => {
    const { status } = this.state;
    if (canStateContinue(this.state)) {
      switch (status) {
        case 0:
          this.setState(_ => ({ status: _.status + 1 }));
          break;
        case 1:
          this.setState(_ => ({ status: _.status + 1 }));
          break;
        default:
          this.complete();
          break;
      }
    }
  };

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

  complete = () => {
    console.log("complete");
    this.props.navigation.goBack(null);
  };

  render() {
    const { office, course, year, status } = this.state;
    const canContinue = canStateContinue(this.state);
    return (
      <AndroidBackHandler onBackPress={this.goBack}>
        <View style={{ flex: 1 }}>
          <BasicHeader
            title={"Modifica il tuo istituto o scuola"}
            goBack={this.goBack}
          />
          <View style={{ flex: 1 }}>
            <ScrollView keyboardShouldPersistTaps="always">
              <OfficePicker
                containerStyle={{ margin: 20, flex: 2 / 3 }}
                office={office}
                course={course}
                year={year}
                setOffice={office => this.setItem("office", office)}
                setCourse={course => this.setItem("course", course)}
                setYear={year => this.setItem("year", year)}
                status={status}
              />
            </ScrollView>
          </View>
          <View>
            <ContinueButton
              onPress={this.continue}
              disabled={!canContinue}
              text={status == 2 ? "Salva" : "Continua"}
            />
          </View>
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
)(OfficeChange);

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
