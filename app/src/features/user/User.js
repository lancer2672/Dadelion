import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, {useState} from 'react'
import  DocumentPicker, {types} from 'react-native-document-picker'
import { useSelector, useDispatch } from "react-redux";
import axios from 'axios'

import { setAuth } from '../auth/authSlice';

const User = () => {
    const {user,isAuthenticated} = useSelector(state => state.auth)
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
  }
  return (
    <View style = {{flex:1}}>
      <Text>User</Text>
      <TouchableOpacity  style ={{width:50, height:50}}>
        <Text>Click to choose</Text>
      </TouchableOpacity>
        <TouchableOpacity onPress = {handleLogOut}>
          <Text>Log out</Text>
        </TouchableOpacity>
    </View>
  )
}

export default User

const styles = StyleSheet.create({

})