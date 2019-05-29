import React, { Component } from "react";
import { View, Text, StatusBar } from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Header3 } from "../components/Text";
import ShoppingTab from "../components/Shopping/ShoppingTab";
import * as shoppingActions from "../store/actions/shopping";
import * as searchActions from "../store/actions/search";
import ShoppingChatsList from "../components/Shopping/ShoppingChatsList";
import SearchLink from "../components/Home/SearchLink";
import _ from "lodash";
import colors from "../styles/colors";

export class ShoppingList extends Component {
  static propTypes = {
    isAuthenticated: PropTypes.bool,
    focus: PropTypes.number,
    setShoppingFocus: PropTypes.func,
    data: PropTypes.object,
    orderedData: PropTypes.array
  };

  componentDidMount() {
    this._navListener = this.props.navigation.addListener("willFocus", () => {
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
      setShoppingFocus,
      isAuthenticated
    } = this.props;

    if (!data || _.isEmpty(data)) return this.renderEmpty();

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

  renderEmpty = () => {
    return (
      <View style={{ flex: 1, marginVertical: 20, marginHorizontal: 20 }}>
        <Header3 color="black">
          Sembra che tu non abbia ancora contattato nessun venditore
        </Header3>
        <View style={{ flex: 1 / 3, justifyContent: "center" }}>
          <SearchLink
            style={{ marginHorizontal: 10 }}
            onPress={this.goSearch}
          />
        </View>
      </View>
    );
  };

  goSearch = () => {
    this.props.navigation.navigate("Home");
    this.props.setSearchActive(true);
  };
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.token !== null,
  focus: state.chat.shoppingFocus,
  data: state.chat.data,
  orderedData: state.chat.shoppingOrderedData
});

const mapDispatchToProps = dispatch => ({
  setShoppingFocus: focus => dispatch(shoppingActions.shoppingSetFocus(focus)),
  setSearchActive: isActive => dispatch(searchActions.searchSetActive(isActive))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShoppingList);
