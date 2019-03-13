import React, { Component } from "react";
import { Text, View, TextInput, FlatList, Keyboard } from "react-native";
import PropTypes from "prop-types";
import Button from "./Button";
import colors from "../styles/colors";
import Icon from "react-native-vector-icons/FontAwesome";
import { Header3 } from "./Text";

export default class TextInputPicker extends Component {
  static propTypes = {
    options: PropTypes.array,
    onSelect: PropTypes.func,
    onTextChange: PropTypes.func,
    defaultValue: PropTypes.string,
    value: PropTypes.string
  };

  constructor(props) {
    super(props);

    this.state = {
      isActive: false,
      selected: undefined
    };
  }

  setActive = () =>
    this.setState({
      isActive: true
    });

  setInactive = () =>
    this.setState({
      isActive: false
    });

  _onChange = text => {
    this.props.onTextChange(text);
  };

  _focusInput = () => {
    this.input.focus();
  };

  _setInputRef = input => {
    this.input = input;
  };

  render() {
    const { isActive } = this.state;
    const { options, style, value } = this.props;
    return (
      <View style={[{ padding: 8 }, style]}>
        <View style={{ flexDirection: "row" }}>
          <TextInput
            style={{
              flex: 1,
              fontSize: 18,
              padding: 8,
              elevation: 4,
              backgroundColor: "white",
              justifyContent: "center",
              borderBottomLeftRadius: 6,
              borderTopLeftRadius: 6
            }}
            placeholder={this.props.defaultValue}
            onFocus={this.setActive}
            onChangeText={this._onChange}
            value={value}
            ref={this._setInputRef}
          />
          <View
            style={{
              width: 50,
              backgroundColor: "white",
              elevation: 5,
              borderTopRightRadius: 6,
              borderBottomRightRadius: 6
            }}
          >
            <Button
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center"
              }}
              onPress={this._focusInput}
            >
              <Icon name="edit" size={22} />
            </Button>
          </View>
        </View>
        {isActive ? (
          <View
            style={{
              backgroundColor: "white",
              borderRadius: 6,
              elevation: 3,
              maxheight: 140,
              marginTop: -10
            }}
          >
            <FlatList
              style={{
                flex: 1,
                marginTop: 10,
                borderRadius: 6,
                backgroundColor: "white"
              }}
              keyboardShouldPersistTaps="handled"
              data={options}
              renderItem={this._renderOption}
              keyExtractor={this._keyExtractor}
            />
          </View>
        ) : null}
      </View>
    );
  }

  _keyExtractor = (item, index) => {
    return index.toString();
  };

  _renderOption = ({ item }) => {
    console.log(this.state.selected, item);
    const isSelected =
      this.state.selected && this.state.selected.id === item.id;
    return (
      <Button
        onPress={() => this.onSelection(item)}
        style={{ paddingVertical: 6, paddingLeft: 10 }}
      >
        <Header3 color={isSelected ? "secondary" : "black"}>
          {item.name}
        </Header3>
      </Button>
    );
  };

  onSelection = item => {
    this.setState({
      selected: item,
      isActive: false
    });
    Keyboard.dismiss();
    this.props.onSelect ? this.props.onSelect(item) : null;
  };
}
