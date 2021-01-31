import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer, createSwitchNavigator} from 'react-navigation'
import {createDrawerNavigator} from 'react-navigation-drawer'

// import Screens
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import RegisterScreen from '../screens/RegisterScreen';
import CartScreen from '../screens/CartScreen';
import OrdersScreen from '../screens/OrdersScreen';
import AdminScreen from '../screens/AdminScreen';
import Colors from '../constants/Colors';
import ViewDetailsScreen from '../screens/ViewDetailsScreen';

const AuthNav = createStackNavigator({
  login: LoginScreen,
  register:RegisterScreen,
});


const Home = createStackNavigator({
  home:HomeScreen,
  Cart:CartScreen,
  Details:ViewDetailsScreen,

},{
  headerTintColor:Colors.primary,
}

);

const OrdersNav = createStackNavigator({
  Orders: OrdersScreen,
});

const AdminNav = createStackNavigator({
  Admin: AdminScreen,
});


const DrawerNavigator = createDrawerNavigator(
  {
    home: Home,
    Orders: OrdersNav,
    Admin: AdminNav,
    Logout:AuthNav
  },
  {
    contentOptions: {
      activeTintColor: Colors.primary
    }
  }
);

const MainNavigator = createSwitchNavigator({
  Auth: AuthNav,
  drawer: DrawerNavigator
});

export default createAppContainer(MainNavigator);
