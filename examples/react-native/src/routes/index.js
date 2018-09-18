import { createDrawerNavigator, createStackNavigator } from 'react-navigation';
import { withNavigationRedux } from './withNavigationRedux';
import HomeScreen from '../screens/HomeScreen';

export const Stack = createStackNavigator(
  {
    Home: {
      screen: withNavigationRedux(HomeScreen),
    },
  },
  {
    navigationOptions: ({ navigation }) => {
      console.log('test', navigation);
      const navigationParams = navigation.state.params || {};

      return {
        headerStyle: {
          backgroundColor: navigationParams.themeName === 'dark'
            ? '#f4511e'
            : '#00fd93',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
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
  },
);

export default DefaultRoute;
