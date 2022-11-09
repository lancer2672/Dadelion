import axios from "axios";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, Button, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Post from "./Post";
import HomeHeader from "./HomeHeader";

const Home = ({ navigation }) => {
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
