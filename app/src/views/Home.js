import axios from 'axios';
import React, { useState, useEffect, Component } from 'react';
import {
  StyleSheet,
  Text,
  Button,
  View,
  TouchableOpacity,
  Dimensions
} from 'react-native';


import Post from '../components/post';

const Home = () => {
  const [posts,setPosts] = useState([]);
  useEffect( ()=>{
      const fetchData = async () =>{
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
      }
      fetchData();
  },[])
  
  console.log(posts);
  const FakePosts = [{title:"Title",description:"Description"}]
  return (
    <View>
        <Text></Text> 
        {/* {posts.map((post)=>{
            return Post(post);
        })} */}
        <Post posts = {FakePosts}></Post>
        <Button 
        title = "SomeThing"
        ></Button>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({})
