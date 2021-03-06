import React, { Component } from "react";
import { View, ScrollView } from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import * as authActions from "../store/actions/auth";
import Button from "../components/Button";
import { Header1, Header3 } from "../components/Text";
import OfficePicker, { canStateContinue } from "../components/OfficePicker";
import axios from "axios";
import { ___OFFICE_HINTS_ENDPOINT___ } from "../store/constants";
import { Subject, of } from "rxjs";
import { switchMap, map, catchError } from "rxjs/operators";
import { ajax } from "rxjs/ajax";
import { AndroidBackHandler } from "react-navigation-backhandler";

export class InitProfile extends Component {
  state = {
    status: 0, //0: office, 1: course | class, 2: year,
    office: {},
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
    if (
      this.state.office != undefined &&
      this.state.year != undefined &&
      this.state.course != undefined
    ) {
      const office = {
        ...this.state.office,
        course: {
          ...this.state.course,
          year: this.state.year
        }
      };
      this.props.appInitRedux(office);
      this.props.navigation.navigate("App");
    }
  };

  render() {
    const { office, course, year, status } = this.state;
    return (
      <AndroidBackHandler onBackPress={this.goBack}>
        <ScrollView
          style={{
            flex: 1,
            paddingVertical: 20,
            paddingHorizontal: 18
          }}
        >
          <Header1 color={"primary"} style={{ fontSize: 50 }}>
            Ciao!
          </Header1>
          <Header3 color={"black"} style={{ marginBottom: 5 }}>
            Benvenuto in Civity
          </Header3>
          <Header3 color={"black"}>
            Per rendere la tua esperienza impeccabile abbiamo bisogno di sapere
            il tuo istituto
          </Header3>
          <OfficePicker
            office={office}
            course={course}
            year={year}
            setOffice={office => this.setItem("office", office)}
            setCourse={course => this.setItem("course", course)}
            setYear={year => this.setItem("year", year)}
            status={status}
            goBack={this.goBack}
          />
          <Button
            style={{
              paddingVertical: 4,
              backgroundColor: "white",
              width: 200,
              elevation: 4,
              borderRadius: 6,
              margin: 10,
              alignSelf: "center"
            }}
            onPress={this.continue}
          >
            <Header3 style={{ textAlign: "center" }} color={"primary"}>
              Continua
            </Header3>
          </Button>
        </ScrollView>
      </AndroidBackHandler>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => {
  return {
    appInitRedux: office => dispatch(authActions.authAppInit(office, true))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InitProfile);
