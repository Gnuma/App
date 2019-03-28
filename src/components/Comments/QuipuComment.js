import React, { Component } from "react";
import { View, Keyboard } from "react-native";
import PropTypes from "prop-types";
import CommentComposer from "./CommentComposer";
import { Header2 } from "../Text";
import update from "immutability-helper";
import Comment from "./Comment";
import Divider from "../Divider";

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
    return (
      <View
        key={mainComment.pk}
        onLayout={event => this._onCommentLayout(mainComment.pk, event)}
      >
        <Comment
          {...mainComment}
          isFather
          sellerPK={this.props.sellerPK}
          onAnswer={this._onAnswer}
        />
        {this.state.answeringComment === mainComment.pk ? (
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
    this.props.scrollTo(this.commentsPosition[pk] + 120);
    this.setState({
      answeringComment: pk
    });
  };

  _handleAnswereComposing = text => {
    this.setState({
      answeringValue: text
    });
  };

  _onCommentLayout = (pk, event) => {
    const layout = event.nativeEvent.layout;
    this.commentsPosition[pk] = layout.y + layout.height;
  };

  _handleComposing = text => {
    this.setState({
      value: text
    });
  };

  _onSendAnswer = () => {
    this.setState({
      answeringValue: "",
      answeringComment: null
    });
  };

  _onSend = () => {
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
  };

  newComment = content => {
    const now = new Date();
    const created_at =
      now.getDate() + "/" + now.getMonth() + 1 + "/" + now.getFullYear();
    return {
      pk: "PK" + this.commentsCreated,
      user: {
        username: "Federico",
        id: this.props.sellerPK
      },
      content,
      created_at,
      answers: []
    };
  };
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default QuipuComment;
