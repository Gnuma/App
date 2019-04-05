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
import { notificationsViewItem } from "../store/actions/notifications";
import protectedAction from "../utils/protectedAction";
import NavigationService from "../navigator/NavigationService";

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

    axios
      .get(___GET_AD___ + `${id}/`)
      .then(res => {
        this.setState({
          data: this.formatData(res.data)
        });
      })
      .catch(err => {
        console.log("ERROR", err);
      });

    //this.setState({
    //  data: itemData
    //});

    //To be put in then
    this.props.notificationViewItemRedux(id);
  }

  formatData = data => {
    let comments = data.comment_ad;
    let formattedComments = [];
    for (let i = 0; i < comments.length; i++) {
      formattedComments.push(this.formatComment(comments[i]));
    }

    return {
      ...data,
      comment_ad: formattedComments
    };
  };

  formatComment = comment => {
    formattedComment = {
      content: comment.content,
      created_at: comment.created,
      pk: comment.pk,
      user: comment.user.user,
      answers: []
    };
    for (let i = 0; i < comment.parent_child.length; i++) {
      const answer = comment.parent_child[i];
      formattedComment.answers.push({
        content: answer.content,
        created_at: answer.created,
        pk: answer.id,
        user: answer.user.user
      });
    }
    return formattedComment;
  };

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
            <MainItem
              data={data}
              goToComment={this._goToComment}
              user={this.props.user}
            />
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
    /*NavigatorService.protectedNavigation(
      "CHAT",
      null,
      this.props.contactRedux(
        this.state.data.pk,
        1,
        this.state.data.seller.user.username
      )
    );*/
    protectedAction().then(() => {
      this.props.contactRedux();
      NavigationService.navigate("CHAT");
    });
  };

  _goToComment = () => {
    return this.props.navigation.getParam("goToComment", null);
  };
}

const mapStateToProps = state => ({
  user: {
    username: state.auth.username,
    id: state.auth.id
  }
});

const mapDispatchToProps = dispatch => {
  return {
    contactRedux: (itemID, toID, toUsername) =>
      dispatch(msgActions.contact(itemID, toID, toUsername)),
    notificationViewItemRedux: itemPK => dispatch(notificationsViewItem(itemPK))
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
