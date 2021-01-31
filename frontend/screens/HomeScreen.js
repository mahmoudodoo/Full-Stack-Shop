import React, { useState, useEffect, useCallback,useRef } from 'react';
import {
  View,
  Text,
  FlatList,
  Button,
  Platform,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButton from '../components/UI/HeaderButton';
import * as cartActions from '../store/actions/cart';
import * as authActions from '../store/actions/auth';

//import HeaderButton from '../components/UI/HeaderButton';
import ProductItem from '../components/shop/ProductItem';
import Colors from '../constants/Colors';

const HomeScreen = props =>{

  const [data,setData] = useState([])
  const [isRefreshing, setIsRefreshing] = useState(false);
  const token = useSelector(state => state.auth.token);
  const dispatch = useDispatch();

  const [product,setProduct] = useState({})

  const cartTotalAmount = useSelector(state => state.cart.totalAmount);
  const cartItems = useSelector(state => state.cart.items)
  const printTotalAmount = () =>{
    console.log(token)
    console.log(cartTotalAmount)
    console.log(cartItems)
  }
  if(!token){
    props.navigation.navigate('login');
  }


      const  fetchProducts = async () =>{
      setIsRefreshing(true);
      const response = await fetch('http://10.0.2.2:5000/product', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }
    });
      setIsRefreshing(false);

    if (!response.ok) {
      const errorResData = await response.json();
      let message = 'Something went wrong!';
      console.log(errorResData)
      throw new Error(message);
    }

    // do somthing here !!!!!
    setData(await response.json())
    console.log(data['products'])

    }





return(
  <View>
    <TouchableOpacity
      onPress={fetchProducts}>
      <Text style={{justifyContent: 'center',alignItems: 'center',textAlign: 'center'}}>Click To Refresh Data!</Text>
      <FlatList
        onRefresh={fetchProducts}
        refreshing={isRefreshing}
        data={data['products']}
        keyExtractor={item => item.id}
        renderItem={itemData => (
          <ProductItem
            image={itemData.item.imageUrl}
            title={itemData.item.title}
            price={itemData.item.price}
            onSelect={() => {}}
          >
          <TouchableOpacity>
            <Button
              color={Colors.primary}
              title="More Information"
              onPress={() => {
                setProduct({
                  description: itemData.item.description,
                  id: itemData.item.id,
                  title:itemData.item.title,
                  price: itemData.item.price,
                  imageUrl:itemData.item.imageUrl
                })
                props.navigation.navigate('Details',{'product':product})
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Button
              color={Colors.primary}
              title="To Cart"
              onPress={() => {dispatch(cartActions.addToCart(itemData.item))}}
            />
          </TouchableOpacity>
          </ProductItem>
        )}
      />
    </TouchableOpacity>
  </View>
);
}
HomeScreen.navigationOptions = navData => {
  return {
    headerTitle: 'Home',
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName='md-menu'
          onPress={() => {navData.navigation.toggleDrawer()}}

        />
      </HeaderButtons>
    ),
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Cart"
          iconName='md-cart'
          onPress={() => {

            navData.navigation.navigate('Cart');
          }}

        />
      </HeaderButtons>
    ),
    headerTintColor: Colors.primary,

  };
};
const styles = StyleSheet.create({})

export default HomeScreen;
