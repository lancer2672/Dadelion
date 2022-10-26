import { View, Text, TextInput, Button, ImageBackground, StyleSheet } from 'react-native'
import React from 'react'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {useNavigation} from '@react-navigation/native'
import { increment, setAuth} from '../redux/features//auth/authSlice.js'

const axios = require('axios').default;

const Login = ({navigation}) => {
  const counter = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  console.log('username',username, '\n','password:',password);

  const handleSubmitForm = () => {
      axios.post('http://172.17.18.158:3000/api/auth/login',{username, password})
      .then(function (response) {
        
        console.log(response.data)
        navigation.navigate('Home');
      })
      .catch(function (error) {
          console.log(error)
      });
      
  }
  const handleRegistration = () =>{
    navigation.navigate('Register');
  }
  return (

    <ImageBackground source = {require('../../assets/imgs/Auth.jpg')} style = {styles.container}>
      <TextInput  onChangeText={newUsername => setUsername(newUsername)} placeholder='Tên đăng nhập' ></TextInput>
      <TextInput  onChangeText={newPassword => setPassword(newPassword)} secureTextEntry={true} placeholder='Mật khẩu'></TextInput>
      <Text></Text>
      <Button
        onPress={handleSubmitForm}
        title="Đăng nhập"
        color="#841584"
      />
      <Button
        onPress={handleRegistration}
        title="Đăng ký"
        color="#841584"
      />
    </ImageBackground>
  )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        width: "100%",
    }
})
export default Login