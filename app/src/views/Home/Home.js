import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, Text, Button, View, TouchableOpacity } from "react-native";

import { MessageBar } from "@src/components/notification/message-bar.component";
import Post from "@src/features/post/screens/post.screen";
import HomeHeader from "./HomeHeader";
const Home = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View>
        <HomeHeader navigation={navigation}></HomeHeader>
      </View>
      {/* <MessageBar message={`Xin chào ${user.nickname}`}></MessageBar> */}
      <View style={styles.postContainer}>
        <Post navigation={navigation}></Post>
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {},
  postContainer: {},
});
