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
//import LoginScreen from "../views/Auth/Login";
//import SignupScreen from "../views/Auth/Signup";
import Auth from "../views/Auth/Auth";
import CameraScreen from "../views/Camera";
import SelectBookScreen from "../views/SelectBook";
import VendiInfosScreen from "../views/VendiInfos";
import ChatHomeScreen from "../views/ChatHome";
import SingleChatScreen from "../views/SingleChat";
import InitProfileScreen from "../views/InitProfile";
import CreateBookScreen from "../views/CreateBook";

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
      },
      CreateBook: {
        screen: CreateBookScreen,
        path: "/vendi/createbook"
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

const ChatNavigator = {
  screen: createStackNavigator(
    {
      ChatHome: {
        screen: ChatHomeScreen,
        path: "/chat"
      },
      ChatSingle: {
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

const InitProfileNavigator = {
  screen: createStackNavigator(
    {
      IPHome: {
        screen: InitProfileScreen,
        path: "/iphome"
      }
    },
    {
      defaultNavigationOptions: {
        header: null
      }
    }
  )
};

/*
const AuthNavigator = {
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
*/

const AppStack = createBottomTabNavigator(
  {
    SEARCH: SearchNavigator,
    VENDI: VendiNavigator,
    CHAT: ChatNavigator
  },
  {
    tabBarComponent: TabBar
  }
);

const MainStack = createStackNavigator(
  {
    App: AppStack,
    AUTH: Auth
  },
  {
    mode: "modal",
    headerMode: "none"
  }
);

const RootStack = createSwitchNavigator(
  {
    AppLoader: AppLoaderScreen,
    Main: MainStack,
    InitProfile: InitProfileNavigator
  },
  {
    initialRouteName: "AppLoader"
  }
);

export default createAppContainer(RootStack);
