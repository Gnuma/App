import React, { Component } from "react";
import { View } from "react-native";
import PropTypes from "prop-types";
import { Header3, Header5, Header4 } from "../Text";
import Divider from "../Divider";
import Button from "../Button";

export default class Comment extends Component {
  static propTypes = {
    pk: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    user: PropTypes.object,
    content: PropTypes.string,
    isFather: PropTypes.bool,
    sellerPK: PropTypes.number
  };

  render() {
    const { isFather, answers } = this.props;
    //console.log(this.props);
    return (
      <View>
        {this._renderHeader()}
        {this._renderContent()}
        {isFather ? (
          <View style={{ marginLeft: 12 }}>
            {answers.map(answer => {
              return (
                <Comment
                  {...answer}
                  key={answer.pk}
                  isFather={false}
                  sellerPK={this.props.sellerPK}
                />
              );
            })}
          </View>
        ) : null}
      </View>
    );
  }

  _renderHeader = () => {
    const { user, created_at, isFather, sellerPK, pk } = this.props;
    return (
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          alignItems: "center"
        }}
      >
        <Header3
          color={sellerPK === user.id ? "secondary" : "black"}
          style={{ fontSize: 20, maxWidth: 100 }}
          numberOfLines={1}
        >
          {user.username}
        </Header3>
        <Divider style={{ width: 20, height: 1, marginHorizontal: 4 }} />
        <Header5>{created_at}</Header5>
        {isFather ? (
          <Button
            style={{
              marginHorizontal: 2,
              paddingHorizontal: 6,
              paddingVertical: 2,
              borderRadius: 4
            }}
            onPress={() => this.props.onAnswer(pk)}
          >
            <Header4 color="primary">Rispondi</Header4>
          </Button>
        ) : null}
        <View
          style={{ justifyContent: "flex-end", flex: 1, flexDirection: "row" }}
        >
          <Button
            style={{
              marginHorizontal: 2,
              paddingHorizontal: 6,
              paddingVertical: 2,
              borderRadius: 4
            }}
          >
            <Header4 color="red">Segnala</Header4>
          </Button>
        </View>
      </View>
    );
  };

  _renderContent = () => {
    const { content, isFather } = this.props;
    return (
      <View style={{ marginLeft: isFather ? 12 : 0 }}>
        <Header3>{content}</Header3>
      </View>
    );
  };

  _renderAnswers = () => {
    const { answers } = this.props;
  };
}