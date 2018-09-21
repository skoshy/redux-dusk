import React from 'react';
import {
  TouchableOpacity,
} from 'react-native';
import {
  createDrawerNavigator,
  createStackNavigator,
} from 'react-navigation';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { withNavigationRedux } from './withNavigationRedux';
import CustomDrawerContentComponent from './CustomDrawerContent';
import HomeScreen from '../screens/HomeScreen';
import PostScreen from '../screens/PostScreen';
import SettingsScreen from '../screens/SettingsScreen';

export const Stack = createStackNavigator(
  {
    HomeScreen: {
      screen: withNavigationRedux(HomeScreen),
      navigationOptions: ({ navigation }) => {
        const navigationParams = navigation.state.params || {};
        const theme = navigationParams.theme || {};

        return {
          title: 'Home',
          headerLeft: (
            <TouchableOpacity
              style={{ paddingLeft: 10, paddingRight: 10 }}
              onPress={() => { navigation.openDrawer(); }}
            >
              <FontAwesome5 color={theme.headerTitleColor} size={18} name="bars" />
            </TouchableOpacity>
          ),
          headerRight: (
            <TouchableOpacity style={{ paddingLeft: 10, paddingRight: 10 }} onPress={() => { navigation.navigate('SettingsScreen'); }}>
              <FontAwesome5 color={theme.headerTitleColor} size={18} name="cog" />
            </TouchableOpacity>
          ),
        };
      },
    },
    PostScreen: {
      screen: withNavigationRedux(PostScreen),
      navigationOptions: {
        title: 'Post',
      },
    },
  },
  {
    navigationOptions: ({ navigation }) => {
      const navigationParams = navigation.state.params || {};
      const theme = navigationParams.theme || {};

      return {
        headerStyle: {
          backgroundColor: theme.headerBackgroundColor,
        },
        headerTitleStyle: {
          color: theme.headerTitleColor,
          fontWeight: 'bold',
        },
        headerTintColor: theme.headerTitleColor,
      };
    },
  },
);

export const LoggedInRoute = createDrawerNavigator(
  {
    Main: Stack,
  },
  {
    initialRouteName: 'Main',
    contentComponent: CustomDrawerContentComponent,
  },
);

export const SettingsRoute = createStackNavigator(
  {
    SettingsScreen: {
      screen: withNavigationRedux(SettingsScreen),
      navigationOptions: ({ navigation }) => {
        const navigationParams = navigation.state.params || {};
        const theme = navigationParams.theme || {};

        return {
          headerRight: (
            <TouchableOpacity
              style={{ paddingLeft: 10, paddingRight: 10 }}
              onPress={() => { navigation.dismiss(); }}
            >
              <FontAwesome5 color={theme.headerTitleColor} size={18} name="times" />
            </TouchableOpacity>
          ),
        };
      },
    },
  },
  {
    navigationOptions: ({ navigation }) => {
      const navigationParams = navigation.state.params || {};
      const theme = navigationParams.theme || {};

      return {
        title: 'Settings',
        headerStyle: {
          backgroundColor: theme.headerBackgroundColor,
        },
        headerTitleStyle: {
          color: theme.headerTitleColor,
          fontWeight: 'bold',
        },
        headerTintColor: theme.headerTitleColor,
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
    mode: 'modal',
    headerMode: 'none',
  },
);
