import { Button, Text, TextInput, View, StyleSheet, ImageBackground } from 'react-native'
import React, { Component} from 'react'
import Login from '../components/Login';

const axios = require('axios').default;
function  Auth(props){
    async function handleRegistration(params) {
    const obj = {
      "username": "a",
      "password": "a",
      "email": "ád@mgail.com"
    }
    axios.post('http://172.17.18.158:3000/api/auth/register',obj)
      .then(function (response) {
        console.log(response.data)
      })
      .catch(function (error) {
          console.log(error)
      });
    } 

    let body;
    body = Login;
    return (
    <ImageBackground source={require('../../assets/imgs/Auth.jpg')} style = {styles.image}>
      {body()}
    </ImageBackground>
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
export default Auth