import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, Text, Button, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { MessageBar } from "../../components/notification/message-bar.component";
import { AuthenticationContext } from "../../services/authentication/authentication.context";
import Post from "../../features/post/screens/post.screen";
import HomeHeader from "./HomeHeader";
const Home = ({ navigation }) => {
  const { user } = useContext(AuthenticationContext);
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
