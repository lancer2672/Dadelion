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
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from "@react-navigation/native";
import {Feather } from '@expo/vector-icons'

const SCREEN_WIDTH = Dimensions.get("window").width;

// import { setPosts } from "../features/post/postSlice";
import Post from "../features/post/Post";
import User from "../features/user/User";

const Home = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
    initialRouteName="Post"
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;
        if (route.name === 'Post') {
          iconName = 'home'
        } else if (route.name === 'User') {
          iconName = focused ? 'user-check' : 'user';
        }
        // You can return any component that you like here!
        return <Feather name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: 'tomato',
      tabBarInactiveTintColor: 'gray',
    })}
  >
      
       <Tab.Screen name="Post" options={{headerShown: false}} component={Post} />
       <Tab.Screen name="User" options={{headerShown: false}} component={User} />
     </Tab.Navigator>
  );
};

export default Home;

const styles = StyleSheet.create({});
