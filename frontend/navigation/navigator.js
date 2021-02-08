import React from 'react';
import {SafeAreaView,View,Platform,Button} from 'react-native';
import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer, createSwitchNavigator} from 'react-navigation'
import {createDrawerNavigator,DrawerItems} from 'react-navigation-drawer'
import {useDispatch,useSelector} from 'react-redux';

// import actions
import * as authActions from '../store/actions/auth'
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
  },
  {
    contentOptions: {
      activeTintColor: Colors.primary
    },
    contentComponent: props => {
      const dispatch = useDispatch();
      return <View style={{flex: 1}}>
          <SafeAreaView forceInset={{top:'always' ,horizontal:'never'}}>
            <DrawerItems {...props}/>
            <Button  title='Logout' color={Colors.primary} onPress={() => {
              dispatch(authActions.logout());
            
              props.navigation.navigate('Auth');
            }}/>
          </SafeAreaView>
        </View>
      
    }
  }
);

const MainNavigator = createSwitchNavigator({
  Auth: AuthNav,
  drawer: DrawerNavigator
});

export default createAppContainer(MainNavigator);
