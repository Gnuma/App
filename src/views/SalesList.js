import React, { Component } from "react";
import { View, Text, StatusBar } from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import SalesTab from "../components/Sales/SalesTab";
import * as salesActions from "../store/actions/sales";
import { Header3, Header2 } from "../components/Text";
import SalesChatsList from "../components/Sales/SalesChatsList";
import SellButton from "../components/Sales/SellButton";
import _ from "lodash";
import Button from "../components/Button";
import colors from "../styles/colors";
import IconPlus from "../media/vectors/plus-icon";
import { GreyBar } from "../components/StatusBars";

export class SalesList extends Component {
  static propTypes = {
    isAuthenticated: PropTypes.bool,
    focus: PropTypes.number,
    setSaleFocus: PropTypes.func,
    data: PropTypes.object,
    orderedData: PropTypes.array
  };

  componentDidMount() {
    this._navListener = this.props.navigation.addListener("didFocus", () => {
      StatusBar.setBackgroundColor(colors.lightGrey);
    });
  }

  componentWillUnmount() {
    this._navListener.remove();
  }

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
        {!data || _.isEmpty(data) ? (
          this.renderEmpty()
        ) : (
          <View style={{ flex: 1 }}>
            <SalesTab
              goTo={setSaleFocus}
              isAuthenticated={isAuthenticated}
              data={data}
              orderedData={orderedData}
              focus={focus}
            />
            <SalesChatsList
              isAuthenticated={isAuthenticated}
              data={data}
              orderedData={orderedData}
              focus={focus}
              onGoChat={this.onGoChat}
            />
            <SellButton onPress={this.onGoSell} />
          </View>
        )}
      </View>
    );
  }

  onGoSell = () => {
    this.props.navigation.navigate("Vendi");
  };

  onGoChat = (itemID, chatID) => {
    this.props.navigation.navigate("SaleChat", {
      itemID,
      chatID
    });
  };

  renderEmpty = () => {
    return (
      <View style={{ flex: 1, marginHorizontal: 20, marginVertical: 20 }}>
        <Header3 color="black">
          Sembra che tu non abbia ancora creato nessun annuncio...
        </Header3>
        <Button
          style={{
            backgroundColor: colors.white,
            elevation: 2,
            borderRadius: 8,
            alignSelf: "center",
            padding: 6,
            marginTop: 30
          }}
          onPress={this.onGoSell}
        >
          <IconPlus />
        </Button>
        <Header2 color="primary" style={{ marginTop: 10, alignSelf: "center" }}>
          Inizia ora
        </Header2>
      </View>
    );
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
