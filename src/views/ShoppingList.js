import React, { Component } from "react";
import { View, Text } from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Header3 } from "../components/Text";
import ShoppingTab from "../components/Shopping/ShoppingTab";
import * as shoppingActions from "../store/actions/shopping";
import ShoppingChatsList from "../components/Shopping/ShoppingChatsList";

export class ShoppingList extends Component {
  static propTypes = {
    isAuthenticated: PropTypes.bool,
    focus: PropTypes.number,
    setShoppingFocus: PropTypes.func,
    data: PropTypes.object,
    orderedData: PropTypes.array
  };

  render() {
    const {
      data,
      orderedData,
      focus,
      setShoppingFocus,
      isAuthenticated
    } = this.props;

    return (
      <View style={{ flex: 1 }}>
        <ShoppingTab
          goTo={setShoppingFocus}
          isAuthenticated={isAuthenticated}
          data={data}
          orderedData={orderedData}
          focus={focus}
        />
        <ShoppingChatsList
          isAuthenticated={isAuthenticated}
          data={data}
          orderedData={orderedData}
          focus={focus}
          onGoChat={this.onGoChat}
        />
      </View>
    );
  }

  onGoChat = (subjectID, chatID) => {
    this.props.navigation.navigate("ShoppingChat", {
      subjectID,
      chatID
    });
  };
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.token !== null,
  focus: state.shopping.focus,
  data: state.shopping.data,
  orderedData: state.shopping.orderedData
});

const mapDispatchToProps = dispatch => ({
  setShoppingFocus: focus => dispatch(shoppingActions.shoppingSetFocus(focus))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShoppingList);
