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
      <TouchableWithoutFeedback
        style={StyleSheet.absoluteFill}
        onPress={this.hideNC}
      >
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
          {commentsOrdered && !_.isEmpty(commentsOrdered) ? (
            <NotificationCenter
              data={commentsData}
              orderedData={commentsOrdered}
              commentHandler={goComment}
              isActive={this.state.NCActive}
              show={this.showNC}
              animation={this.state.NCAnimation}
            />
          ) : null}
          <View
            style={{ flex: 1, justifyContent: "center" }}
            pointerEvents={this.state.NCActive ? "none" : "auto"}
          >
            <BookShelf onPress={searchOption} />
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }

  onNCPlaceholderLayout = event => {
    console.log(event.nativeEvent.layout);
    this.setState({
      NCLayout: event.nativeEvent.layout
    });
  };
}
