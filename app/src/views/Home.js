import axios from "axios";
import React, { useState, useEffect, Component } from "react";
import {
  StyleSheet,
  Text,
  Button,
  View,
  TouchableOpacity,
  Dimensions,
} from "react-native";

const SCREEN_WIDTH = Dimensions.get("window").width;

// import { setPosts } from "../features/post/postSlice";
import Post from "../features/post/post";

const Home = () => {

  return (
    <View>
      <Post></Post>
      <Button title="SomeThing"></Button>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
