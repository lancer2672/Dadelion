import axios from "axios";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, Button, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Post from "../../features/post/screens/post.screen";
import HomeHeader from "./HomeHeader";

const Home = ({ ...props }) => {
  const { navigation } = props;
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <HomeHeader navigation={navigation}></HomeHeader>
      </View>
      <View style={styles.postContainer}>
        <Post navigation={navigation}></Post>
      </View>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {},
  postContainer: {
    marginTop: 20,
  },
  header: {
    height: 72,
  },
});
