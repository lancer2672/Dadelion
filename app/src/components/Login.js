import { View, Text,TextInput,Button, StyleSheet } from 'react-native'
import React from 'react'

const Login = () => {
  return (
    <View style={ styles.container}>
      <TextInput placeholder='Tên đăng nhập' ></TextInput>
      <TextInput placeholder='Mật khẩu'></TextInput>
      <Button
        title="Đăng nhập"
        color="#841584"
      />
    </View>
  )
}
const styles = StyleSheet.create({
    image: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        width: "100%",
    }
})
export default Login