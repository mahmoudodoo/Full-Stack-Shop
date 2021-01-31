import React, { useEffect, useState } from 'react';
import {
  View,
  FlatList,
  Text,
  Platform,
  ActivityIndicator,
  StyleSheet
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import OrderItem from '../components/shop/OrderItem';
import HeaderButton from '../components/UI/HeaderButton';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import Colors from '../constants/Colors';


const OrdersScreen = props =>{
  const [data,setData] = useState([])
  const [isRefreshing, setIsRefreshing] = useState(false);

  const  fetchOrders= async () =>{
  setIsRefreshing(true);
  const response = await fetch('http://10.0.2.2:5000/order', {
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
console.log(data['orders'])

}



   return (
     <FlatList
       onRefresh={fetchOrders}
       refreshing={isRefreshing}
       data={data['orders']}
       keyExtractor={item => item.id}
       renderItem={itemData => (
         <OrderItem
           amount={itemData.item.totalAmount}
           date={itemData.item.date}
           userId={itemData.item.user_id}
         />
       )}
     />
   );
 };


 OrdersScreen.navigationOptions = navData => {
   return {
     headerTitle: 'All Orders',
     headerLeft: (
       <HeaderButtons HeaderButtonComponent={HeaderButton}>
         <Item
           title="Menu"
           iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
           onPress={() => {
             navData.navigation.toggleDrawer();
           }}
         />
       </HeaderButtons>
     )
   };
 };

 const styles = StyleSheet.create({
   centered: {
     flex: 1,
     justifyContent: 'center',
     alignItems: 'center'
   }
 });

export default OrdersScreen;
