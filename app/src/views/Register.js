import { StyleSheet,TextInput,Button, ImageBackground, Text, View } from 'react-native'
import React from 'react'

const Register = ({navigation}) => {
  const navigateToLoginScreen = () =>{
    navigation.navigate('Login');
  }
  return (
  
    <ImageBackground source = {require('../../assets/imgs/Auth.jpg')} style = {styles.container}>
      <TextInput placeholder='Email'></TextInput>
      <TextInput placeholder='Tên đăng nhập' ></TextInput>
      <TextInput placeholder='Mật khẩu'></TextInput>
      <TextInput placeholder='Nhập lại mật khẩu'></TextInput>
      <Button
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
    width: "100%",
  }
})