import React, { Component } from "react";
import { StyleSheet } from "react-native";
import {
  createAppContainer,
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";
import HomeScreen from "../views/Home";
import ItemScreen from "../views/Item";
import VendiScreen from "../views/Vendi";

import Header from "../Header/Header";
import colors from "../styles/colors";

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
        }
      },
      {
        defaultNavigationOptions: ({ navigation }) => {
          return {
            header: <Header />
          };
        },
        headerMode: "float"
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
