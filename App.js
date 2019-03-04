import React, { Component } from "react";
import { View, Text } from "react-native";
import { Provider, connect } from "react-redux";
import configureStore from "./src/store/configureStore";
import Navigator from "./src/navigator/Navigator";
import NavigationService from "./src/navigator/NavigationService";

const store = configureStore();

class App extends Component {
  componentWillUnmount() {
    console.log("App Has unmounted");
  }

  render() {
    return (
      <Provider store={store}>
        <Navigator
          ref={navigatorRef => {
            NavigationService.setTopLevelNavigator(navigatorRef);
          }}
        />
      </Provider>
    );
  }
}

export default App;
