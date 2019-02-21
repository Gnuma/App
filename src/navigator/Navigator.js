import React, { Component } from "react";
import { StyleSheet } from "react-native";
import {
  createAppContainer,
  createStackNavigator,
  createBottomTabNavigator,
  createSwitchNavigator
} from "react-navigation";

import HomeScreen from "../views/Home";
import ItemScreen from "../views/Item";
import SearchScreen from "../views/Search";
import VendiScreen from "../views/Vendi";
import AppLoaderScreen from "../views/AppLoader";
import LoginScreen from "../views/Auth/Login";
import SignupScreen from "../views/Auth/Signup";

import Header from "../Header/Header";

const AppStack = createBottomTabNavigator({
  SEARCH: {
    screen: createStackNavigator(
      {
        Home: {
          screen: HomeScreen,
          path: "/home",
          navigationOptions: () => ({
            header: <Header />
          })
        },
        Item: {
          screen: ItemScreen,
          path: "/item/:itemid",
          navigationOptions: () => ({
            header: null
          })
        }
      },
      {
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
  },
  AUTH: {
    screen: createStackNavigator(
      {
        Login: {
          screen: LoginScreen,
          path: "/login"
        },
        Signup: {
          screen: SignupScreen,
          path: "/signup"
        }
      },
      {
        defaultNavigationOptions: {
          initialRouteName: "Login",
          header: null
        }
      }
    )
  }
});

const FullApp = createSwitchNavigator(
  {
    AppLoader: AppLoaderScreen,
    App: AppStack
  },
  {
    initialRouteName: "AppLoader"
  }
);

export default createAppContainer(FullApp);
