import React, { Component } from "react";
import { View, Text, ScrollView } from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import ItemHeader from "../components/MainItem/ItemHeader";
import MainSell from "../components/MainSell/MainSell";
import * as sellActions from "../store/actions/sell";

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
      setConditionsRedux
    } = this.props;

    return (
      <View style={{ flex: 1 }}>
        <ItemHeader
          handleGoBack={this._handleGoBack}
          title={title}
          authors={authors}
        />
        <MainSell
          handleSubmit={this.handleSubmit}
          price={price}
          conditions={conditions}
          description={description}
          setPrice={setPriceRedux}
          setDescription={setDescriptionRedux}
          setConditions={setConditionsRedux}
        />
      </View>
    );
  }

  _handleGoBack = () => {
    this.props.navigation.goBack(null);
  };

  handleSubmit = () => {};
}

const mapStateToProps = state => ({
  price: state.sell.price,
  description: state.sell.description,
  conditions: state.sell.conditions
});

const mapDispatchToProps = dispatch => {
  return {
    setPriceRedux: price => dispatch(sellActions.setPrice(price)),
    setDescriptionRedux: description =>
      dispatch(sellActions.setDescription(description)),
    setConditionsRedux: conditions =>
      dispatch(sellActions.setConditions(conditions))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VendiInfos);
