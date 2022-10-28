import { View, Image,TouchableOpacity, Text, TextInput, Button, ImageBackground, StyleSheet } from 'react-native'
import React from 'react'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as SecureStore from 'expo-secure-store';

import Auth from './layouts/Auth.js';
import { increment, setAuth} from '../redux/features/auth/authSlice.js'
import { AppSlogan } from '../slogan.js';
import Color from '../color.js';

const axios = require('axios').default;

const Login = ({navigation}) => {
  const counter = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  console.log("LoginScreen")
  const handleSubmitForm = async () => {
    console.log("LoginScreenCallAPI")
      await axios.post('http://172.17.18.158:3000/api/auth/login',{username, password})
      .then(function (response) {
        const {token, user} = response.data;
        // saveToken(user.username, token);
        console.log("Waiting to login")
        navigation.navigate('Home');
        console.log("Navigated to home")

      })
      .catch(function (error) {
         console.log(error)
      });
    console.log("called API")
  }
  const navigateToRegisterScreen = () =>{
    navigation.navigate('Register');
  }
  // async function saveToken(username, token){
  //   await SecureStore.setItemAsync(username, token);
  //   console.log('success');
  // }
  return (
    <ImageBackground source = {require('../../assets/imgs/Auth.jpg')} style = {styles.container}>
    <Image
      style={styles.tinyLogo}
      source={require('./../../assets/imgs/Logo.png')}
      />
      <Text>{AppSlogan}</Text>
      <TextInput style = {styles.textInput} onChangeText={newUsername => setUsername(newUsername)} placeholder='Tên đăng nhập' ></TextInput>
      <TextInput style = {styles.textInput} onChangeText={newPassword => setPassword(newPassword)} secureTextEntry={true} placeholder='Mật khẩu'></TextInput>
      <TouchableOpacity
          style={styles.button}
          onPress={handleSubmitForm}
          >
          <Text style={styles.textOfButton}>Đăng nhập</Text>
      </TouchableOpacity>
      <TouchableOpacity
          style={styles.button}
          onPress={navigateToRegisterScreen}
          >
          <Text style={styles.textOfButton}>Đăng ký</Text>
      </TouchableOpacity>
      <Text>Quên mật khẩu ?</Text>

  </ImageBackground>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput:{
    borderRadius:25,
    height: 25,
    marginTop:10,
    color: Color.textColor,
  },
  tinyLogo: {
      width: 200,
      height: 200,
  },
  button: {
    minWidth: 200,
    marginTop:10,
    paddingTop:10,
    paddingBottom:10,
    backgroundColor: "#fff",
    borderRadius:25,
   
  },
  textOfButton:{
    alignSelf:'center',
    fontWeight:'bold',
    color:Color.textColor,
  }
})
export default Login