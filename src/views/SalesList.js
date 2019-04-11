import React, { Component } from "react";
import { View, Text } from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import SalesTab from "../components/Sales/SalesTab";
import * as salesActions from "../store/actions/sales";
import { Header3 } from "../components/Text";
import ChatsList from "../components/Sales/ChatsList";
import SellButton from "../components/Sales/SellButton";

export class SalesList extends Component {
  static propTypes = {
    isAuthenticated: PropTypes.bool,
    focus: PropTypes.number,
    setSaleFocus: PropTypes.func,
    data: PropTypes.object,
    orderedData: PropTypes.array
  };

  render() {
    const {
      data,
      orderedData,
      focus,
      setSaleFocus,
      isAuthenticated
    } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <SalesTab
          goTo={setSaleFocus}
          isAuthenticated={isAuthenticated}
          data={data}
          orderedData={orderedData}
          focus={focus}
        />
        <ChatsList
          isAuthenticated={isAuthenticated}
          data={data}
          orderedData={orderedData}
          focus={focus}
          onGoChat={this.onGoChat}
        />
        <SellButton onPress={this.onGoSell} />
      </View>
    );
  }

  onGoSell = () => {
    this.props.navigation.navigate("Vendi");
  };

  onGoChat = chatid => {
    this.props.navigation.navigate("SaleChat", {
      chatid
    });
  };
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.token !== null,
  focus: state.sales.focus,
  data: state.sales.data,
  orderedData: state.sales.orderedData
});

const mapDispatchToProps = dispatch => ({
  setSaleFocus: focus => dispatch(salesActions.salesSetFocus(focus))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SalesList);
