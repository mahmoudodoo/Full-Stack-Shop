import { StatusBar } from 'expo-status-bar';
import Constants from 'expo-constants';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import cartReducer from './store/reducers/cart';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import ordersReducer from './store/reducers/orders';
import authReducer from './store/reducers/auth';

const rootReducer = combineReducers({
  cart: cartReducer,
  orders: ordersReducer,
  auth: authReducer

});
const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

// import navigation
import DrawerNavigator from './navigation/navigator'

export default function App() {
  return (
    <Provider store={store}>
    <DrawerNavigator />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
