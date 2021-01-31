import React,{useState} from 'react';
import {View,Text,Button,StyleSheet,ScrollView,TouchableOpacity,Switch} from 'react-native';
import { TextInput } from 'react-native-paper';


const RegisterScreen = props =>{
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const [name,setName] = useState('')
  const [pass,setPass] = useState('')

const  saveData = async () =>{
  const response = await fetch('http://10.0.2.2:5000/users', {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    'name': name,
    'password': pass,
    'admin': isEnabled
  })
});

if (!response.ok) {
  const errorResData = await response.json();
  let message = 'Something went wrong!';
  console.log(errorResData)
  throw new Error(message);
}
if (response.ok){
  props.navigation.navigate('login')
}
console.log(isEnabled)

}

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.form}>
          <TextInput style={styles.username}  onChangeText={text => setName(text)} label="Username"/>
          <TextInput style={styles.password} secureTextEntry={true} onChangeText={text => setPass(text)} label="Password"/>
          <TextInput style={styles.password} secureTextEntry={true} label="Confirm Password"/>
        </View>
        <View style={styles.isAdmin}>
          <Text>Sign Up as an Admin!</Text>
          <Switch
           trackColor={{ false: "#767577", true: "#81b0ff" }}
           thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
           ios_backgroundColor="#3e3e3e"
           onValueChange={toggleSwitch}
           value={isEnabled}
         />
        </View>

        <TouchableOpacity style={styles.register} onPress={saveData}>
            <Text style={styles.text}>Sign Up!</Text>
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
  },
  isAdmin:{
    justifyContent: 'space-between',
    alignItems: 'center',

  }


})

export default RegisterScreen;
