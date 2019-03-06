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
import VendiScreen from "../views/Vendi";
import AppLoaderScreen from "../views/AppLoader";
import LoginScreen from "../views/Auth/Login";
import SignupScreen from "../views/Auth/Signup";
import CameraScreen from "../views/Camera";
import SelectBookScreen from "../views/SelectBook";
import VendiInfosScreen from "../views/VendiInfos";
import ChatHomeScreen from "../views/ChatHome";
import SingleChatScreen from "../views/SingleChat";

import Header from "../Header/Header";
import TabBar from "../TabBar/TabBar";

const SearchNavigator = {
  screen: createStackNavigator({
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
  })
};

const VendiNavigator = {
  screen: createStackNavigator(
    {
      Camera: {
        screen: CameraScreen,
        path: "/vendi/camera"
      },
      SelectBook: {
        screen: SelectBookScreen,
        path: "/vendi/selectbook"
      },
      VendiInfos: {
        screen: VendiInfosScreen,
        path: "/vendi/vendiinfos"
      }
    },
    {
      defaultNavigationOptions: {
        header: null
      }
    }
  ),
  navigationOptions: {
    tabBarVisible: false
  }
};

const ProfileNavigator = {
  screen: createStackNavigator(
    {
      Signup: {
        screen: SignupScreen,
        path: "/signup"
      },
      Login: {
        screen: LoginScreen,
        path: "/login"
      }
    },
    {
      defaultNavigationOptions: {
        header: null
      },
      initialRouteName: "Signup",
      initialRouteKey: "startingAuth"
    }
  ),
  navigationOptions: {
    tabBarVisible: false
  }
};

const ChatNavigator = {
  screen: createStackNavigator(
    {
      Home: {
        screen: ChatHomeScreen,
        path: "/chat"
      },
      Chat: {
        screen: SingleChatScreen,
        path: "/chat/:chatid"
      }
    },
    {
      defaultNavigationOptions: {
        header: null
      }
    }
  )
};

ChatNavigator.navigationOptions = ({ navigation }) => {
  let { routeName } = navigation.state.routes[navigation.state.index];
  let navigationOptions = {};
  if (routeName === "Chat") {
    navigationOptions.tabBarVisible = false;
  }

  return navigationOptions;
};

const AppStack = createBottomTabNavigator(
  {
    SEARCH: SearchNavigator,
    VENDI: VendiNavigator,
    AUTH: ProfileNavigator,
    CHAT: ChatNavigator
  },
  {
    tabBarComponent: TabBar
  }
);

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
