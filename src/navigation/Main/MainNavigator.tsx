import React from 'react';
import LoginScreen from '../../screens/Login/LoginScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import DrawerNavigation from '../Drawer/DrawerNavigation';
import CategoryScreen from '../../screens/Category/CategoryScreen';
import CartScreen from '../../screens/Cart/CartScreen';

export type RootStackParamList = {
  DrawerNavigation: undefined;
  Login: undefined;
  Home: undefined;
  Category?: any;
  Cart: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const MainNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="DrawerNavigation" component={DrawerNavigation} />
      <Stack.Screen name="Category" component={CategoryScreen} />
      <Stack.Screen name="Cart" component={CartScreen} />
    </Stack.Navigator>
  );
};

export default MainNavigator;
