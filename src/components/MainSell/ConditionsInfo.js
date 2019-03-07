import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";
import { Header2, Header3 } from "../Text";
import Button from "../Button";
import colors from "../../styles/colors";

export default class ConditionsInfo extends Component {
  render() {
    const { conditions } = this.props;
    return (
      <View style={styles.container}>
        <Header3 color={"primary"}>
          Seleziona le condizioni del tuo libro
        </Header3>
        <View
          style={{
            marginVertical: 15,
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Button
            style={[
              styles.button,
              { borderColor: conditions === 1 ? colors.secondary : "white" }
            ]}
            onPress={this._setOttimo}
          >
            <Header3 style={styles.buttonText} color={"secondary"}>
              Ottimo
            </Header3>
          </Button>
          <Button
            style={[
              styles.button,
              { borderColor: conditions === 2 ? colors.lightYellow : "white" }
            ]}
            onPress={this._setBuono}
          >
            <Header3 style={styles.buttonText} color={"lightYellow"}>
              Buono
            </Header3>
          </Button>
          <Button
            style={[
              styles.button,
              { borderColor: conditions === 3 ? colors.red : "white" }
            ]}
            onPress={this._setUsato}
          >
            <Header3 style={styles.buttonText} color={"red"}>
              Usato
            </Header3>
          </Button>
        </View>
      </View>
    );
  }

  _setOttimo = () => {
    this.props.handleChange(1);
  };
  _setBuono = () => {
    this.props.handleChange(2);
  };
  _setUsato = () => {
    this.props.handleChange(3);
  };
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 15,
    marginHorizontal: 35,
    paddingHorizontal: 18,
    paddingVertical: 6,
    backgroundColor: "white",
    elevation: 4,
    borderRadius: 6
  },
  button: {
    marginHorizontal: 10,
    marginVertical: 8,
    paddingVertical: 10,
    backgroundColor: "white",
    borderColor: "white",
    borderWidth: 2,
    borderRadius: 6,
    elevation: 4,
    flex: 0,
    flexDirection: "row"
  },
  buttonText: {
    flex: 1,
    textAlign: "center"
  }
});