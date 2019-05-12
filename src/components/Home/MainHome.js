import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Animated
} from "react-native";
import SearchLink from "./SearchLink";
import NotificationCenter from "./NotificationCenter";
import BookShelf from "./BookShelf";
import _ from "lodash";
import colors from "../../styles/colors";

export default class MainHome extends Component {
  state = {
    NCLayout: null,
    NCActive: false,
    NCAnimation: new Animated.Value(0)
  };

  showNC = () => this.setState({ NCActive: true });
  hideNC = () => this.setState({ NCActive: false });

  componentDidUpdate(prevProps) {
    if (this.hasNewNotification(this.props.commentsOrdered)) {
      Animated.timing(this.state.NCAnimation, {
        toValue: 1,
        duration: 2000
        //useNativeDriver: true
      }).start();
    }
  }

  hasNewNotification = commentsOrdered =>
    commentsOrdered && !_.isEmpty(commentsOrdered);

  render() {
    const {
      openSearchBar,
      commentsOrdered,
      commentsData,
      goComment,
      searchOption
    } = this.props;

    return (
      <View style={{ justifyContent: "center", flex: 1 }}>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            paddingVertical: 25
          }}
        >
          <SearchLink onPress={openSearchBar} />
        </View>
        <View style={{ flex: 1 }} onLayout={this.onNCPlaceholderLayout}>
          {commentsOrdered && !_.isEmpty(commentsOrdered) ? (
            <Animated.View
              style={{
                width: 1,
                height: this.state.NCAnimation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 44]
                }),
                backgroundColor: colors.darkRed
              }}
            />
          ) : null}
          <View style={{ flex: 1, justifyContent: "center" }}>
            <BookShelf onPress={searchOption} />
          </View>
        </View>
        {commentsOrdered &&
        !_.isEmpty(commentsOrdered) &&
        this.state.NCLayout ? (
          <View
            style={{
              ...StyleSheet.absoluteFill,
              elevation: 5
            }}
          >
            <View style={{ flex: 1 }}>
              <View
                style={{
                  alignItems: "center",
                  paddingTop: this.state.NCLayout.y
                }}
              >
                <NotificationCenter
                  data={commentsData}
                  orderedData={commentsOrdered}
                  commentHandler={goComment}
                  isActive={this.state.NCActive}
                  show={this.showNC}
                  animation={this.state.NCAnimation}
                />
              </View>
            </View>
          </View>
        ) : null}
      </View>
    );
  }

  onNCPlaceholderLayout = event => {
    console.log(event.nativeEvent.layout);
    this.setState({
      NCLayout: event.nativeEvent.layout
    });
  };
}