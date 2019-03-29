import React, { Component } from "react";
import { View, Keyboard } from "react-native";
import PropTypes from "prop-types";
import CommentComposer from "./CommentComposer";
import { Header2 } from "../Text";
import update from "immutability-helper";
import Comment from "./Comment";
import Divider from "../Divider";
import colors from "../../styles/colors";

class QuipuComment extends Component {
  static propTypes = {
    data: PropTypes.array,
    sellerPK: PropTypes.number,
    scrollTo: PropTypes.func
  };

  constructor(props) {
    super(props);

    this.commentsPosition = {};
    this.commentsCreated = 0;

    let formattedData = {};
    for (let i = 0; i < props.data.length; i++) {
      formattedData[props.data[i].pk] = props.data[i];
    }

    this.state = {
      value: "",
      answeringComment: null,
      answeringValue: "",
      data: props.data
    };
  }

  render() {
    const { value } = this.state;
    return (
      <View>
        <CommentComposer
          value={value}
          onTextChange={this._handleComposing}
          onSend={this._onSend}
        />
        <View>{this.state.data.map(this._renderMainComment)}</View>
      </View>
    );
  }

  _renderMainComment = (mainComment, index) => {
    const isFocused = this.state.answeringComment === mainComment.pk;
    return (
      <View
        key={mainComment.pk}
        onLayout={event =>
          this._onCommentLayout(
            mainComment.pk,
            event,
            isFocused && this.state.moveTo
          )
        }
        style={
          isFocused
            ? {
                borderColor: colors.secondary,
                borderWidth: 2,
                padding: 4,
                borderRadius: 6
              }
            : null
        }
      >
        <Comment
          {...mainComment}
          isFather
          sellerPK={this.props.sellerPK}
          onAnswer={this._onAnswer}
        />
        {isFocused ? (
          <CommentComposer
            value={this.state.answeringValue}
            onTextChange={this._handleAnswereComposing}
            onSend={this._onSendAnswer}
          />
        ) : null}
        {index !== this.state.data.length - 1 ? (
          <Divider
            style={{ width: 160, marginVertical: 6, alignSelf: "center" }}
          />
        ) : null}
      </View>
    );
  };

  _onAnswer = pk => {
    if (this.commentsPosition[pk]) {
      this.setState({
        answeringComment: pk,
        moveTo: true
      });
    } else {
      console.warn("Comment not found");
    }
  };

  _handleAnswereComposing = text => {
    this.setState({
      answeringValue: text
    });
  };

  _onCommentLayout = (pk, event, moveTo) => {
    const layout = event.nativeEvent.layout;
    this.commentsPosition[pk] = layout.y + layout.height;
    if (moveTo)
      this.setState({ moveTo: false }, () =>
        this.props.scrollTo(this.commentsPosition[pk] + 120)
      );
  };

  _handleComposing = text => {
    this.setState({
      value: text
    });
  };

  _onSendAnswer = () => {
    const { user } = this.props;
    if (user) {
      this.setState(prevState => ({
        answeringValue: "",
        answeringComment: null
      }));
    } else {
      console.warn("Not logged in");
    }
  };

  _onSend = () => {
    const { user } = this.props;
    if (user) {
      this.setState(
        prevState => ({
          value: "",
          data: update(prevState.data, {
            $unshift: [this.newComment(prevState.value)]
          })
        }),
        () => {
          this.commentsCreated++;
          Keyboard.dismiss();
        }
      );
    } else {
      console.warn("Not logged in");
    }
  };

  newComment = content => {
    const now = new Date();
    const created_at =
      now.getDate() + "/" + now.getMonth() + 1 + "/" + now.getFullYear();
    return {
      pk: "PK" + this.commentsCreated,
      user: {
        username: this.props.user.username,
        id: this.props.user.pk
      },
      content,
      created_at,
      answers: []
    };
  };
}

export default QuipuComment;
