import {
  createDrawerNavigator,
  createStackNavigator,
} from 'react-navigation';
import { withNavigationRedux } from './withNavigationRedux';
import CustomDrawerContentComponent from './CustomDrawerContent';
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
            ? '#333'
            : '#ccc',
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
    contentComponent: CustomDrawerContentComponent,
  },
);
