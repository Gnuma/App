import React, { Component } from "react";
import { View } from "react-native";
import PropTypes from "prop-types";
import CommentComposer from "./CommentComposer";
import { Header2 } from "../Text";
import update from "immutability-helper";

class QuipuComment extends Component {
  static propTypes = {
    data: PropTypes.array
  };

  constructor(props) {
    super(props);
    this.commentsCreated = 0;
    this.state = {
      value: "",
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

  _renderMainComment = mainComment => {
    return (
      <View key={mainComment.pk}>
        <Header2>{mainComment.content}</Header2>
      </View>
    );
  };

  _handleComposing = text => {
    this.setState({
      value: text
    });
  };

  _onSend = () => {
    this.setState(
      prevState => ({
        value: "",
        data: update(prevState.data, {
          $unshift: [
            { content: prevState.value, pk: "PK" + this.commentsCreated }
          ]
        })
      }),
      () => this.commentsCreated++
    );
  };
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default QuipuComment;
