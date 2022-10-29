import axios from 'axios';
import React, { useState, useEffect, Component } from 'react';
import {RecyclerListView, DataProvider, LayoutProvider} from 'recyclerlistview'
import {
  StyleSheet,
  Text,
  Button,
  View,
  TouchableOpacity,
  Dimensions
} from 'react-native';


import Post from '../components/post';

const SCREEN_WIDTH = Dimensions.get('window').width;

const Home = () => {
  const [posts,setPosts] = useState([]);
  
  console.log("HomeScreen");
  useEffect( ()=>{
      const fetchData = async () =>{
          console.log("HomeScreen calling API")
          await axios.get('http://localhost:3000/',{
            headers: {
            Authorization: "Bearer asdf"
            }
          })
          .then(response =>{
            console.log("Success");
            setPosts(response.data.posts);
          })  
          .catch(err => console.log(err))
          console.log("HomeScreen called API")
      }
      fetchData();
  },[])

  console.log(posts);
  return (
    <View>
        <Text></Text> 
        {/* {posts.map((post)=>{
            return Post(post);
        })} */}
        <Post posts = {posts}></Post>
        <Button 
        title = "SomeThing"
        ></Button>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({})
