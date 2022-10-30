import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, {useState} from 'react'
import {DocumentPicker, types} from 'react-native-document-picker'

const User = () => {
    
    const [fileResponse, setFileResponse] = useState([]);

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
  return (
    <View style = {{flex:1}}>
      <Text>User</Text>
      <TouchableOpacity onPress={handleDocumentSelection} style ={{width:50, height:50}}>
        <Text>Click to choose</Text>
      </TouchableOpacity>
    </View>
  )
}

export default User

const styles = StyleSheet.create({})