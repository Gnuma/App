import React, { Component } from "react";
import { View, Text } from "react-native";
import { Provider, connect } from "react-redux";
import configureStore from "./src/store/configureStore";
import Navigator from "./src/navigator/Navigator";

const store = configureStore();

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Navigator />
      </Provider>
    );
  }
}

export default App;
