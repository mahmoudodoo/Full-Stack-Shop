import React, { useEffect, useState } from 'react';
import {
  View,
  FlatList,
  Text,
  Platform,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextAlert,
  Alert
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import OrderItem from '../components/shop/OrderItem';
import HeaderButton from '../components/UI/HeaderButton';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import Colors from '../constants/Colors';
import { TextInput } from 'react-native-paper';







const AdminScreen = props =>{

    const [title,setTitle] =useState('')
    const [imageUrl,setImageUrl] =useState('')
    const [description,setDescription] =useState('')
    const [price,setPrice] =useState('')
    const isAdmin = useSelector(state => state.auth.isAdmin);
    const [productId,setProductId] =useState(0)


    const  addProductHandler = async () =>{
      const response = await fetch('http://10.0.2.2:5000/product', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        'description': description,
        'imageUrl': imageUrl,
        'price': price,
        'title':title
      })
    });

    if (!response.ok) {
      const errorResData = await response.json();
      let message = 'Something went wrong!';
      console.log(errorResData)
      throw new Error(message);
    }
    if (response.ok){
      props.navigation.navigate('home')
    }

    }

    const  deleteProductHandler = async () =>{
      const response = await fetch(`http://10.0.2.2:5000/product/${productId}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorResData = await response.json();
      let message = 'Something went wrong!';
      console.log(errorResData)
      throw new Error(message);
    }
    if (response.ok){

        const message = await response.json()
        Alert.alert("Delete Product",`${message['message']}`,[{text:"OK",style:"cancel"}])
        props.navigation.navigate('home')

    }

    }




    const [isAddProduct,setIsAddProduct] = useState(true);
    const [isRemoveProduct,setIsRemoveProduct] = useState(false);

    if (!isAdmin){
      return (
           <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
             <Text>You are not Admin You can not add or remove anything !!</Text>
           </View>
            );
    }

    let form = (
      <View style={styles.form}>
        <TextInput style={styles.input}  onChangeText={text => setTitle(text)} label="Title"/>
        <TextInput style={styles.input}  onChangeText={text => setImageUrl(text)} label="ImageUrl"/>
        <TextInput style={styles.input}  onChangeText={text => setDescription(text)} label="Description"/>
        <TextInput style={styles.input}  onChangeText={text => setPrice(text)} label="Price"/>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={addProductHandler}>
              <Text style={styles.text}>Add Product</Text>
            </TouchableOpacity>
          </View>
      </View>
    );
    if(isRemoveProduct){
      form = (
        <View style={styles.form}>
        <TextInput style={styles.input}  onChangeText={text => setProductId(text)} label="Product ID"/>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={deleteProductHandler}>
            <Text style={styles.text}>Delete</Text>
          </TouchableOpacity>
        </View>
        </View>
    )
    }


    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.tabsContainer}>
          <TouchableOpacity style={{...styles.tabs,backgroundColor: isAddProduct ? 'orange' : Colors.primary}} onPress={() =>
              {
                  setIsAddProduct(true)
                  setIsRemoveProduct(false)
                }
            }>
            <Text style={styles.text}>Add Product</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{...styles.tabs,backgroundColor: isRemoveProduct ? 'orange' : Colors.primary}} onPress={() =>
              {
                setIsRemoveProduct(true)
                setIsAddProduct(false)
              }
              }>
            <Text style={styles.text}>Remove Product</Text>
          </TouchableOpacity>
          </View>
          {form}
        </ScrollView>
      </View>
    );
  }


  AdminScreen.navigationOptions = navData => {
    return {
      headerTitle: 'Add Products',
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
    container: {
      flex: 1,
      backgroundColor: '#fff',
      justifyContent: 'center',
    },
    form:{
      width: '100%',
      padding: 5,
      marginBottom: 5,
      justifyContent: 'center',
    },
    input : {
      width: '100%',
      textAlign: 'center',
      justifyContent: 'center',
      padding: 3,
      marginBottom: 5,
      borderBottomWidth: 2,
      borderColor: 'black'
    },

    text:{
      color: 'white',
      fontSize: 20
    },
    tabsContainer:{
      flexDirection: 'row',
      justifyContent: 'center'
    },
    tabs:{
      height: 40,
      width: '50%',
      alignItems: 'center',
      borderWidth: 4,
      borderColor: 'black'
    },
    buttonContainer:{
      flex:1,
      width: '100%',
      height: 40,
      backgroundColor:Colors.primary,
      justifyContent: 'center'
    },
    button:{
      width: '100%',
      alignItems: 'center',
      borderWidth: 4,
      borderColor: 'black'
    }


  })
export default AdminScreen;
