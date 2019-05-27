import React, { Component } from "react";
import { View, Text, ScrollView, ActivityIndicator } from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import ItemHeader from "../components/Item/ItemHeader";
import MainSell from "../components/Sell/MainSell";
import * as sellActions from "../store/actions/sell";
import { Header2 } from "../components/Text";
import colors from "../styles/colors";
import { Actions, SwitchAction } from "react-navigation";
import NavigationService from "../navigator/NavigationService";
import { GreyBar } from "../components/StatusBars";
import protectedAction from "../utils/protectedAction";

export class VendiInfos extends Component {
  state = {
    price: "",
    conditions: -1,
    description: ""
  };

  render() {
    const title = "Matematica Verde 3";
    const authors = "Massimo Badonzia";

    const {
      price,
      conditions,
      description,
      setPriceRedux,
      setDescriptionRedux,
      setConditionsRedux,
      loading
    } = this.props;

    return (
      <View style={{ flex: 1 }}>
        <ItemHeader
          handleGoBack={this._handleGoBack}
          title={title}
          authors={authors}
        />
        {!loading ? (
          <MainSell
            price={price}
            conditions={conditions}
            description={description}
            setPrice={setPriceRedux}
            setDescription={setDescriptionRedux}
            setConditions={setConditionsRedux}
            handleComplete={this._handleComplete}
          />
        ) : (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <ActivityIndicator size="large" color={colors.secondary} />
          </View>
        )}
      </View>
    );
  }

  _handleGoBack = () => {
    this.props.navigation.goBack(null);
  };

  _handleComplete = () => {
    if (
      this.props.price &&
      this.props.description &&
      this.props.conditions !== undefined
    ) {
      protectedAction()
        .then(() => {
          this.props
            .submitRedux()
            .then(() => {
              //this.props.navigation.dispatch(StackActions.popToTop());
              //console.log(SwitchActions.jumpTo({ routeName: "SalesList" }));
              //this.props.navigation.dispatch(
              //  SwitchActions.jumpTo({ routeName: "SalesList" })
              //);
              this.props.navigation.navigate("SalesList");
            })
            .catch(err => {
              console.log("Nope.", err);
            });
        })
        .catch(() => console.log("Need to be logged in"));
    }
  };
}

const mapStateToProps = state => ({
  price: state.sell.price,
  description: state.sell.description,
  conditions: state.sell.conditions,
  loading: state.sell.loading
});

const mapDispatchToProps = dispatch => {
  return {
    setPriceRedux: price => dispatch(sellActions.setPrice(price)),
    setDescriptionRedux: description =>
      dispatch(sellActions.setDescription(description)),
    setConditionsRedux: conditions =>
      dispatch(sellActions.setConditions(conditions)),
    submitRedux: () => dispatch(sellActions.submit())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VendiInfos);
