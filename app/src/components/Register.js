import { StyleSheet,TextInput,Button, Text, View } from 'react-native'
import React from 'react'

const Register = () => {
  return (
    <View>
      <TextInput placeholder='Tên đăng nhập' ></TextInput>
      <TextInput placeholder='Mật khẩu'></TextInput>
      <TextInput placeholder='Nhập lại mật khẩu'></TextInput>
      <TextInput placeholder='Email'></TextInput>
      <Button
        title="Đăng nhập"
        color="#841584"
      />
    </View>
  )
}

export default Register

const styles = StyleSheet.create({

})