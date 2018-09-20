import React from 'react';
import {
  createDrawerNavigator,
  createStackNavigator,
  withNavigation,
} from 'react-navigation';
import { Button, ButtonText } from '../components/Core/Input';
import { withNavigationRedux } from './withNavigationRedux';
import CustomDrawerContentComponent from './CustomDrawerContent';
import HomeScreen from '../screens/HomeScreen';

export const Stack = createStackNavigator(
  {
    Home: {
      screen: withNavigationRedux(HomeScreen),
      navigationOptions: {
        title: 'Home',
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
        headerLeft: (
          <Button onPress={() => { navigation.openDrawer(); }}>
            <ButtonText>Open</ButtonText>
          </Button>
        ),
      };
    },
  },
);

export const DefaultRoute = createDrawerNavigator(
  {
    Main: Stack,
  },
  {
    initialRouteName: 'Main',
    contentComponent: CustomDrawerContentComponent,
    
  },
);
