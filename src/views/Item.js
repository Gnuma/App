import React, { Component } from "react";
import { View, StyleSheet, ActivityIndicator, Keyboard } from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import ItemHeader from "../components/Item/ItemHeader";
import { itemData } from "../mockData/Item";
import MainItem from "../components/Item/MainItem";
import ContactButton from "../components/Item/ContactButton";
import colors from "../styles/colors";
import NavigatorService from "../navigator/NavigationService";
import axios from "axios";
import { ___GET_AD___ } from "../store/constants";
import * as msgActions from "../store/actions/messaging";

export class Item extends Component {
  state = {
    data: undefined,
    bookName: this.props.navigation.getParam("name", "Undesfineds"),
    bookAuthors: this.props.navigation.getParam("authors", "Undesfineds"),
    keyboardOpen: false
  };

  componentDidMount() {
    console.log("Mounted");
    /*
    this.didFocusSubscription = this.props.navigation.addListener(
      "didFocus",
      payload => {
        console.debug("didFocus", payload);
      }
    );
    */

    this.keyboardEventListeners = [
      Keyboard.addListener("keyboardDidShow", this.setKeyboardOpen(true)),
      Keyboard.addListener("keyboardDidHide", this.setKeyboardOpen(false))
    ];

    const { navigation } = this.props;
    const id = navigation.getParam("itemID", "Undesfineds");

    /*
    axios
      .get(___GET_AD___ + `${id}/`)
      .then(res => {
        this.setState({
          data: res.data
        });
      })
      .catch(err => {
        console.log("ERROR", err);
      });
      */

    this.setState({
      data: itemData
    });
  }

  componentWillUnmount() {
    this.keyboardEventListeners &&
      this.keyboardEventListeners.forEach(eventListener =>
        eventListener.remove()
      );

    //this.didFocusSubscription && this.didFocusSubscription.remove();
    console.log("Unmounting");
  }

  setKeyboardOpen = value => () => this.setState({ keyboardOpen: value });

  render() {
    const { data, bookName, bookAuthors } = this.state;
    const { navigation } = this.props;
    const isLoading = data === undefined;

    return (
      <View style={{ flex: 1 }}>
        <ItemHeader
          handleGoBack={this._handleGoBack}
          title={bookName}
          authors={bookAuthors}
        />
        {isLoading ? (
          <View style={styles.container}>
            <ActivityIndicator size="large" color={colors.secondary} />
          </View>
        ) : (
          <View style={{ flex: 1 }}>
            <MainItem data={data} goToComment={this._goToComment} />
            {!this.state.keyboardOpen ? (
              <ContactButton onContact={this._handleContact} />
            ) : null}
          </View>
        )}
      </View>
    );
  }

  _handleGoBack = () => {
    this.props.navigation.goBack(null);
  };

  _handleContact = () => {
    NavigatorService.protectedNavigation(
      "CHAT",
      null,
      this.props.contactRedux(
        this.state.data.pk,
        1,
        this.state.data.seller.user.username
      )
    );
  };

  _goToComment = () => {
    return this.props.navigation.getParam("goToComment", null);
  };
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => {
  return {
    contactRedux: (itemID, toID, toUsername) =>
      dispatch(msgActions.contact(itemID, toID, toUsername))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Item);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

//<ImageSlider imgWidth={imageWidth} imgHeight={imageHeight} />
