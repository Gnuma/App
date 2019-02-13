import React, { Component } from "react";
import { StyleSheet } from "react-native";
import {
  createAppContainer,
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";
import HomeScreen from "../views/Home";
import ItemScreen from "../views/Item";
import SearchScreen from "../views/Search";
import VendiScreen from "../views/Vendi";

import Header from "../Header/Header";

const app = createBottomTabNavigator({
  SEARCH: {
    screen: createStackNavigator(
      {
        Home: {
          screen: HomeScreen,
          path: "/home"
        },
        Item: {
          screen: ItemScreen,
          path: "/item/:itemid"
        },
        Search: {
          screen: SearchScreen,
          path: "/search"
        }
      },
      {
        defaultNavigationOptions: {
          header: <Header />
        },
        headerMode: "float",
        initialRouteName: "Home"
      }
    ),
    defaultNavigationOptions: {
      tabBarLabel: "Cerca"
    }
  },
  VENDI: {
    screen: VendiScreen,
    defaultNavigationOptions: {
      tabBarLabel: "Vendi"
    }
  }
});

export default createAppContainer(app);
