import React, { Component } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import ItemHeader from "../components/MainItem/ItemHeader";
import { itemData } from "../mockData/Item";
import {
  Header5,
  Header1,
  Header3,
  Header2,
  Header4
} from "../components/Text";
import ImageSlider from "../components/MainItem/ImageSlider";
import ConditionCircle from "../components/ConditionCircle";
import Icon from "react-native-vector-icons/FontAwesome";
import Button from "../components/Button";
import Divider from "../components/Divider";

export class Item extends Component {
  state = {
    data: undefined
  };

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        data: itemData
      });
    }, 100);
  }

  render() {
    const { data } = this.state;
    const { title, authors } = this.props;
    const isLoading = data === undefined;

    return (
      <View style={{ flex: 1 }}>
        <ItemHeader
          navigation={this.props.navigation}
          title={"Matematica Verder"}
          authors={"Massimiliano Bergamini, Anna Tritonoe e Graziella Banzoni"}
        />
        {isLoading ? (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Header5>Loading</Header5>
          </View>
        ) : (
          <ScrollView style={{ flex: 1 }}>
            <ImageSlider
              imgWidth={imageWidth}
              imgHeight={imageHeight}
              style={{ marginTop: 10 }}
            />
            <View style={{ flex: 1, marginHorizontal: 30 }}>
              <View style={{ flexDirection: "row" }}>
                <View style={{ alignItems: "flex-start" }}>
                  <Header1>EUR 15</Header1>
                </View>
                <View style={{ flex: 1, alignItems: "flex-end" }}>
                  <Header3>invece di EUR 30</Header3>
                </View>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  marginVertical: 30
                }}
              >
                <View
                  style={{
                    alignItems: "flex-start"
                  }}
                >
                  <ConditionCircle conditions={1} />
                </View>
                <View
                  style={{
                    flex: 1,
                    alignItems: "flex-end"
                  }}
                >
                  <Header2>I.I.S.S. J. Von Neumann</Header2>
                  <Header3>Via Pollenza, 115</Header3>
                </View>
              </View>
              <View
                style={{
                  backgroundColor: "white",
                  elevation: 4,
                  padding: 10
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center"
                  }}
                >
                  <View>
                    <Header2>Federico</Header2>
                  </View>
                  <View
                    style={{
                      flex: 1,
                      alignItems: "flex-end",
                      justifyContent: "center"
                    }}
                  >
                    <Icon name="chevron-right" size={22} />
                  </View>
                </View>
                <View style={{ marginVertical: 10 }}>
                  <Button
                    style={{
                      backgroundColor: "white",
                      elevation: 2,
                      flexDirection: "row",
                      padding: 10,
                      justifyContent: "center",
                      borderRadius: 8,
                      marginVertical: 4
                    }}
                  >
                    <Header4>Salva Venditore</Header4>
                    <Icon
                      name="heart"
                      size={20}
                      style={{
                        position: "absolute",
                        right: 10,
                        alignSelf: "center"
                      }}
                    />
                  </Button>
                  <Button
                    style={{
                      backgroundColor: "white",
                      elevation: 2,
                      flexDirection: "row",
                      padding: 10,
                      justifyContent: "center",
                      borderRadius: 4,
                      marginVertical: 8
                    }}
                  >
                    <Header4>Salva Venditore</Header4>
                    <Icon
                      name="heart"
                      size={20}
                      style={{
                        position: "absolute",
                        right: 10,
                        alignSelf: "center"
                      }}
                    />
                  </Button>
                  <Button
                    style={{
                      backgroundColor: "white",
                      elevation: 2,
                      flexDirection: "row",
                      padding: 10,
                      justifyContent: "center",
                      borderRadius: 4,
                      marginVertical: 8
                    }}
                  >
                    <Header4>Salva Venditore</Header4>
                    <Icon
                      name="heart"
                      size={20}
                      style={{
                        position: "absolute",
                        right: 10,
                        alignSelf: "center"
                      }}
                    />
                  </Button>
                </View>
              </View>
              <Divider
                style={{
                  marginTop: 25,
                  marginBottom: 10,
                  marginHorizontal: 20
                }}
              />
              <View style={{ alignItems: "center" }}>
                <Header3 style={{ textAlign: "center" }}>
                  Libro Matematica Verde 3 venduto praticamente nuovo giusto
                  qualche ammaccatura contattatemi per informazioni e prezzo.
                </Header3>
              </View>
              <Divider
                style={{
                  marginTop: 10,
                  marginBottom: 10,
                  marginHorizontal: 20
                }}
              />
              <View style={{ flexDirection: "row", marginHorizontal: 20 }}>
                <View>
                  <Header3>ISBN</Header3>
                  <Header3>Materia</Header3>
                  <Header3>Anno</Header3>
                  <Header3>Istituto</Header3>
                </View>
                <View style={{ alignItems: "flex-end", flex: 1 }}>
                  <Header3>9788804705161</Header3>
                  <Header3>Matematica</Header3>
                  <Header3>III</Header3>
                  <Header3>Tecnico</Header3>
                </View>
              </View>
              <Divider
                style={{
                  marginTop: 10,
                  marginBottom: 10,
                  marginHorizontal: 20
                }}
              />
            </View>
          </ScrollView>
        )}
      </View>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Item);

const imageHeight = 323;
const imageWidth = 300;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    left: 0,
    top: 0
  }
});

//<ImageSlider imgWidth={imageWidth} imgHeight={imageHeight} />
