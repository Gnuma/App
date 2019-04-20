import React, { Component } from "react";
import { View, Text, AppState } from "react-native";
import { Provider, connect } from "react-redux";
import store from "./src/store/store";
import Navigator from "./src/navigator/Navigator";
import NavigationService from "./src/navigator/NavigationService";

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
