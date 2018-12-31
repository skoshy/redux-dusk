import React from 'react';
import {
  createDrawerNavigator,
  createStackNavigator,
} from 'react-navigation';
import { withNavigationRedux } from './withNavigationRedux';
import CustomDrawerContentComponent from './CustomDrawerContent';
import HomeScreen from '../screens/HomeScreen';
import PostScreen from '../screens/PostScreen';
import SettingsScreen from '../screens/SettingsScreen';
import {
  defaultNavigatorOptions,
  getNavOptionsVars,
  HeaderButton,
} from './helpers';

export const Stack = createStackNavigator(
  {
    HomeScreen: {
      screen: withNavigationRedux(HomeScreen),
      navigationOptions: ({ navigation }) => {
        const { theme } = getNavOptionsVars(navigation);

        return {
          title: `Home`,
          headerLeft: (
            <HeaderButton
              theme={theme}
              onPress={() => { navigation.openDrawer(); }}
              icon="bars"
            />
          ),
          headerRight: (
            <HeaderButton
              theme={theme}
              onPress={() => { navigation.navigate(`SettingsScreen`); }}
              icon="cog"
            />
          ),
        };
      },
    },
    PostScreen: {
      screen: withNavigationRedux(PostScreen),
      navigationOptions: ({ navigation }) => {
        const { theme } = getNavOptionsVars(navigation);

        return {
          title: `Post`,
          headerLeft: (
            <HeaderButton
              theme={theme}
              onPress={() => { navigation.goBack(); }}
              icon="arrow-left"
            />
          ),
        };
      },
    },
  },
  {
    ...defaultNavigatorOptions,
    navigationOptions: ({ navigation }) => {
      const { defaultHeaderStyles } = getNavOptionsVars(navigation);

      return {
        ...defaultHeaderStyles,
      };
    },
  },
);

export const LoggedInRoute = createDrawerNavigator(
  {
    Main: Stack,
  },
  {
    ...defaultNavigatorOptions,
    initialRouteName: `Main`,
    contentComponent: CustomDrawerContentComponent,
  },
);

export const SettingsRoute = createStackNavigator(
  {
    SettingsScreen: {
      screen: withNavigationRedux(SettingsScreen),
      navigationOptions: ({ navigation }) => {
        const { theme } = getNavOptionsVars(navigation);

        return {
          headerRight: (
            <HeaderButton
              theme={theme}
              onPress={() => { navigation.dismiss(); }}
              icon="times"
            />
          ),
        };
      },
    },
  },
  {
    ...defaultNavigatorOptions,
    navigationOptions: ({ navigation }) => {
      const { defaultHeaderStyles } = getNavOptionsVars(navigation);

      return {
        ...defaultHeaderStyles,
        title: `Settings`,
      };
    },
  },
);


export const DefaultRoute = createStackNavigator(
  {
    Main: LoggedInRoute,
    SettingsScreen: SettingsRoute,
  },
  {
    ...defaultNavigatorOptions,
    mode: `modal`,
    headerMode: `none`,
  },
);
