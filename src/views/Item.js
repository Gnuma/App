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
import * as shoppingActions from "../store/actions/shopping";
import * as commentActions from "../store/actions/comments";
import { notificationsViewItem } from "../store/actions/notifications";
import protectedAction from "../utils/protectedAction";
import NavigationService from "../navigator/NavigationService";
import { mockContactItem } from "../mockData/Chat2";

export class Item extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: undefined,
      bookName: props.navigation.getParam("name", "Undesfineds"),
      bookAuthors: props.navigation.getParam("authors", "Undesfineds"),
      keyboardOpen: false
    };

    this.newComments =
      props.commentsData[props.navigation.getParam("itemID", "Undefined")];
    if (this.newComments) {
      this.newComments = this.newComments.commentsList;
      this.hasNewComments = true;
    } else {
      this.newComments = {};
      this.hasNewComments = false;
    }
  }

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
    const id = navigation.getParam("itemID", "Undefined");

    axios
      .get(___GET_AD___ + `${id}/`)
      .then(res => {
        this.setState({
          data: this.formatData(res.data)
        });
        console.log(res.data);
        console.log(this.formatData(res.data));
        this.props.readComments(id);
      })
      .catch(err => {
        console.log("ERROR", err);
      });

    /*this.setState({
      data: this.formatData(itemData)
    });*/
  }

  formatData = data => {
    let comments = data.comment_ad;

    console.log("NativeComments", comments);
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
      content: comment.text,
      created_at: comment.createdAt,
      pk: comment.pk,
      user: { _id: comment.user._id, ...comment.user.user },
      answers: []
    };
    for (let i = 0; i < comment.parent_child.length; i++) {
      const answer = comment.parent_child[i];
      formattedComment.answers.push({
        content: answer.text,
        created_at: answer.createdAt,
        pk: answer.id,
        user: { _id: answer.user._id, ...answer.user.user }
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
          hasNewComments={this.hasNewComments}
        />
        {isLoading ? (
          <View style={styles.container}>
            <ActivityIndicator size="large" color={colors.secondary} />
          </View>
        ) : (
          <View style={{ flex: 1 }}>
            <MainItem
              data={data}
              user={this.props.user}
              newComments={this.newComments}
              onContact={this._handleContact}
            />
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
    /*protectedAction().then(() => {
      this.props.contactRedux();
    });*/
    this.props.contactRedux(this.state.data);
  };
}

const mapStateToProps = state => ({
  user: {
    username: state.auth.username,
    id: state.auth.id
  },
  commentsData: state.comments.data
});

const mapDispatchToProps = dispatch => {
  return {
    contactRedux: item => dispatch(shoppingActions.shoppingContact(item)),
    notificationViewItemRedux: itemPK =>
      dispatch(notificationsViewItem(itemPK)),
    readComments: item => dispatch(commentActions.commentsRead(item))
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
