import React, { Component } from "react";
import { createAppContainer, createStackNavigator } from "react-navigation";
import HomeScreen from "../views/Home";
import ItemScreen from "../views/Item";

import HomeHeader from "../Header";
import colors from "../styles/colors";

const Home = createStackNavigator(
  {
    Home: { screen: HomeScreen },
    Item: { screen: ItemScreen }
  },
  {
    defaultNavigationOptions: {
      headerStyle: { backgroundColor: colors.secondary },
      headerTitle: <HomeHeader />
    }
  }
);

export default createAppContainer(Home);
