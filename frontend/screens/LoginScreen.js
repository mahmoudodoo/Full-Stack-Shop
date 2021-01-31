import React,{useState, useEffect, useCallback,useRef } from 'react';
import {View,Text,Button,StyleSheet,ScrollView,TouchableOpacity} from 'react-native';
import { useDispatch,useSelector } from 'react-redux';
import { TextInput } from 'react-native-paper';
import * as authActions from '../store/actions/auth';

const LoginScreen = props =>{
  const [name,setName] = useState('')
  const [pass,setPass] = useState('')
  const base64 = require('base-64');

  const [isAdmin,setIsAdmin] = useState(false)
  const [token,setToken] = useState('')
  const [userId,setUserId] = useState('')

  const dispatch = useDispatch()
  const  loginHandler = async () =>{


    var headers = new Headers();
    headers.set('Authorization', 'Basic ' + base64.encode(name + ":" + pass));

    const response = await fetch('http://10.0.2.2:5000/login', {
      headers:headers
  });

  if (!response.ok) {
    const errorResData = await response.json();
    let message = 'Something went wrong!';
    console.log(errorResData)
    throw new Error(message);
  }
  if (response.ok){
    const data =await response.json()
    dispatch(authActions.authenticate(data.user_id,data.token,data.isAdmin))
    props.navigation.navigate('home')
  }

  }




  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.form}>
          <TextInput style={styles.username}  onChangeText={text => setName(text)} label="Username"/>
          <TextInput style={styles.password} secureTextEntry={true} onChangeText={text => setPass(text)} label="Password"/>
        </View>
        <TouchableOpacity style={styles.loginButton} onPress={loginHandler}>
            <Text style={styles.text}>Login!</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.register} onPress={() => props.navigation.navigate('register')}>
            <Text style={styles.text}>Register Here!</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

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
  username : {
    width: '100%',
    textAlign: 'center',
    justifyContent: 'center',
    padding: 3,
    marginBottom: 5,
    borderBottomWidth: 2,
    borderColor: 'black'
  },
  password : {
    width: '100%',
    textAlign: 'center',
    justifyContent: 'center',
    padding: 3,
    marginBottom: 5,
    borderBottomWidth: 2,
    borderColor: 'black'
  },
  buttonContainer : {
    padding: 5,
    marginBottom: 5,
  },
  loginButton:{
    padding: 5,
    marginBottom: 5,
    alignItems: 'center',
    textAlign: 'center',
    backgroundColor: 'blue',
    shadowColor: 'black',
    borderWidth: 3,
    borderColor: 'gray',
    borderRadius: 20,
  },
  register : {
    padding: 5,
    marginBottom: 5,
    alignItems: 'center',
    textAlign: 'center',
    backgroundColor: 'green',
    shadowColor: 'black',
    borderWidth: 3,
    borderColor: 'gray',
    borderRadius: 20,
  },
  text:{
    color: 'white'
  }

})

export default LoginScreen;
