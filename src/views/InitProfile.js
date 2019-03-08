import React, { Component } from "react";
import { View, ScrollView } from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import * as authActions from "../store/actions/auth";
import Button from "../components/Button";
import { Header1, Header3 } from "../components/Text";
import Picker from "../components/Picker";

export class InitProfile extends Component {
  state = {
    office: undefined
  };

  _onSelectOffice = office => {
    this.setState({
      office: office
    });
  };

  _onOpenApp = () => {
    if (this.state.office !== undefined) {
      this.props.appInitRedux(this.state.office);
      this.props.navigation.navigate("App");
    }
  };

  render() {
    return (
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
        <Header3 color={"black"}>Benvenuto in Quipu</Header3>
        <Header3 color={"black"}>
          Per rendere la tua esperienza impeccabile abbiamo bisogno di sapere il
          tuo istituto
        </Header3>
        <Picker
          defaultValue={"Istituto"}
          options={mockOptions}
          style={{ marginVertical: 20 }}
          onSelect={this._onSelectOffice}
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
          onPress={this._onOpenApp}
        >
          <Header3 style={{ textAlign: "center" }} color={"primary"}>
            Continua
          </Header3>
        </Button>
      </ScrollView>
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

const mockOptions = [
  {
    title: "I.I.S.S J. Von Neumann",
    id: 1
  },
  {
    title: "Liceo Scientifico Orazio",
    id: 2
  },
  {
    title: "Liceo Linguistico Nomentano",
    id: 3
  },
  {
    title: "Liceo Classico Nuova Sabina",
    id: 4
  },
  {
    title: "Liceo Classico Giulio Cesare",
    id: 5
  }
];
