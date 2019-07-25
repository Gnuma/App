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

  render() {
    const {
      openSearchBar,
      commentsOrdered,
      commentsData,
      goComment,
      searchOption,
      containerLayout
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
              paddingTop: 25,
              paddingBottom: 10
            }}
          >
            <SearchLink onPress={openSearchBar} />
          </View>
          <View
            style={{ flex: 1, marginBottom: 10 }}
            onLayout={this.props.setContainerLayout}
          >
            <NotificationCenter
              data={commentsData}
              orderedData={commentsOrdered}
              commentHandler={goComment}
              isActive={this.state.NCActive}
              show={this.showNC}
            />
            <View
              style={{ flex: 1 }}
              pointerEvents={this.state.NCActive ? "none" : "auto"}
            >
              <BookShelf
                onPress={searchOption}
                containerLayout={containerLayout}
              />
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }

  //commentsOrdered && !_.isEmpty(commentsOrdered)

  onNCPlaceholderLayout = event => {
    console.log(event.nativeEvent.layout);
    this.setState({
      NCLayout: event.nativeEvent.layout
    });
  };
}

export const NCHeight = 50;
