import axios from "axios";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, Button, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
// import { setPosts } from "../features/post/postSlice";
import Post from "../features/post/Post";
import HomeHeader from "../components/HomeHeader";

const Home = ({ navigation }) => {
  const Tab = createBottomTabNavigator();
  return (
    <SafeAreaView>
      <HomeHeader style={styles.header} navigation={navigation}></HomeHeader>
      <Post style={styles.postContainer} navigation={navigation}></Post>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  postContainer: {
    marginTop: 20,
  },
  header: {},
});
