import { createDrawerNavigator } from 'react-navigation';
import HomeScreen from '../screens/HomeScreen';

export const DefaultRoute = createDrawerNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
  },
  {
    initialRouteName: 'Home',
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#f4511e',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  },
);

export default DefaultRoute;
