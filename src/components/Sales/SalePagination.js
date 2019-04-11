import React, { Component } from "react";
import { Text, View, Animated, FlatList } from "react-native";
import colors from "../../styles/colors";

export default class SalePagination extends Component {
  render() {
    const { data, focus, fullData } = this.props;
    return (
      <FlatList
        renderItem={this._renderItem}
        data={data}
        keyExtractor={this._keyExtractor}
        horizontal
        extraData={{ focus, fullData }}
        contentContainerStyle={{
          justifyContent: "center",
          height: 20,
          flex: 1,
          alignItems: "center"
        }}
      />
    );
  }

  _renderItem = ({ item }) => {
    return (
      <SaleTabDot
        focused={this.props.data[this.props.focus].itemID === item.itemID}
        hasNews={this.props.fullData[item.itemID].newsCount > 0}
      />
    );
  };

  _keyExtractor = (item, index) => item.itemID;
}

class SaleTabDot extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: new Animated.Value(props.focused ? 1 : 0)
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.focused !== this.props.focused) {
      Animated.timing(this.state.value, {
        toValue: this.props.focused ? 1 : 0,
        duration: 100
      }).start();
    }
  }

  render() {
    return (
      <Animated.View
        style={{
          width: 8,
          height: this.state.value.interpolate({
            inputRange: [0, 1],
            outputRange: [14, 18],
            extrapolate: "clamp"
          }),
          marginHorizontal: this.state.value.interpolate({
            inputRange: [0, 1],
            outputRange: [2, 5],
            extrapolate: "clamp"
          }),
          backgroundColor: this.state.value.interpolate({
            inputRange: [0, 1],
            outputRange: [
              this.props.hasNews ? colors.darkRed : colors.white,
              colors.black
            ],
            extrapolate: "clamp"
          }),
          borderColor: this.state.value.interpolate({
            inputRange: [0, 1],
            outputRange: [
              this.props.hasNews ? colors.darkRed : colors.black,
              colors.black
            ],
            extrapolate: "clamp"
          }),
          borderWidth: 1.5,
          borderRadius: 8
        }}
      />
    );
  }
}
