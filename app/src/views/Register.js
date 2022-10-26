import { StyleSheet,TextInput ,Button, Image, ImageBackground, Text, View } from 'react-native'
import { useState } from 'react'
import React from 'react'
import axios from 'axios'

import { AppSlogan } from '../slogan'
const Register = ({navigation}) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [replicatedPassword, setReplicatedPassword] = useState('')


  const navigateToLoginScreen = () =>{
    navigation.navigate('Login');
  }
  const handleRegistration = () =>{
      if(password != replicatedPassword){
        return;
      }
      axios.post('http://172.17.18.158:3000/api/auth/register',{email, username, password})
      .then(function (response) {
        console.log(response);
        navigation.navigate('Login');
      })
      .catch(function (error) {
          console.log(error.response.data)
      });
  }
  return (
  
    <ImageBackground source = {require('../../assets/imgs/Auth.jpg')} style = {styles.container}>
      <Image
        style={styles.tinyLogo}
        source={require('./../../assets/imgs/Logo.png')}
      />
      <Text>{AppSlogan}</Text>
      <TextInput onChangeText={email => setEmail(email)} placeholder='Email'></TextInput>
      <Text placeholder='Email'></Text>
      <TextInput onChangeText={username => setUsername(username)} placeholder='Tên đăng nhập' ></TextInput>
      <TextInput onChangeText={password => setPassword(password)} placeholder='Mật khẩu'></TextInput>
      <TextInput onChangeText={replicatedPassword => setReplicatedPassword(replicatedPassword)} placeholder='Nhập lại mật khẩu'></TextInput>
      <Button
        onPress={handleRegistration}
        title="Đăng ký"
        color="#841584"
      />
      <Button
        onPress={navigateToLoginScreen}
        title="Quay lại đăng nhập"
        color="#841584"
      />
    </ImageBackground>
  )
}

export default Register

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tinyLogo: {
      width: 100,
      height: 100,
      resizeMode: 'center'
  },
})