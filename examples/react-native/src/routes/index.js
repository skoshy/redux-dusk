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

const ICON_SIZE = 20;

const HeaderButton = ({ style = {}, children, ...props }) => {
  return (
    <TouchableOpacity
      style={{
        paddingHorizontal: 12,
        ...style,
      }}
      {...props}
    >
      {children}
    </TouchableOpacity>
  );
};

export const Stack = createStackNavigator(
  {
    HomeScreen: {
      screen: withNavigationRedux(HomeScreen),
      navigationOptions: ({ navigation }) => {
        const navigationParams = navigation.state.params || {};
        const theme = navigationParams.theme || {};

        return {
          title: `Home`,
          headerLeft: (
            <HeaderButton
              onPress={() => { navigation.openDrawer(); }}
            >
              <FontAwesome5 color={theme.headerTitleColor} size={ICON_SIZE} name="bars" />
            </HeaderButton>
          ),
          headerRight: (
            <HeaderButton
              onPress={() => { navigation.navigate(`SettingsScreen`); }}
            >
              <FontAwesome5 color={theme.headerTitleColor} size={ICON_SIZE} name="cog" />
            </HeaderButton>
          ),
        };
      },
    },
    PostScreen: {
      screen: withNavigationRedux(PostScreen),
      navigationOptions: {
        title: `Post`,
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
          fontWeight: `bold`,
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
    initialRouteName: `Main`,
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
            <HeaderButton
              onPress={() => { navigation.dismiss(); }}
            >
              <FontAwesome5 color={theme.headerTitleColor} size={ICON_SIZE} name="times" />
            </HeaderButton>
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
        title: `Settings`,
        headerStyle: {
          backgroundColor: theme.headerBackgroundColor,
        },
        headerTitleStyle: {
          color: theme.headerTitleColor,
          fontWeight: `bold`,
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
    mode: `modal`,
    headerMode: `none`,
  },
);
