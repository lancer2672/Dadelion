import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, {useState} from 'react'
import  DocumentPicker, {types} from 'react-native-document-picker'
import { useSelector, useDispatch } from "react-redux";

import { setAuth } from '../auth/authSlice';
import UserPost from './UserPost';
import { useEffect } from 'react';

const axios = require("axios").default;
const User = ({navigation}) => {
    const {user} = useSelector(state => state.auth)
    const [fileResponse, setFileResponse] = useState([]);
    const dispatch = useDispatch();
    const handleDocumentSelection = async () => {
    try {
      const response = await DocumentPicker.pick({
        presentationStyle: 'fullScreen',
      });
      setFileResponse(response);
    } catch (err) {
      console.warn(err);
    }
  };
  const handleLogOut =  () =>{
      dispatch(setAuth({isAuthenticated:false,user:null}))
      navigation.navigate("Login");
  }
  return (
    <View style = {{flex:1}}>
      <TouchableOpacity  style ={{width:50, height:50}}>
        <Text>Click to choose</Text>
      </TouchableOpacity>
        <TouchableOpacity onPress = {handleLogOut}>
          <Text>Log out</Text>
        </TouchableOpacity>
        <UserPost style = {styles.userPost}></UserPost>
    </View>
  )
}

export default User

const styles = StyleSheet.create({
  userPost:{
    flex:1,
  }
})