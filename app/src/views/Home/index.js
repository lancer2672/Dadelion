import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, Text, Button, View, TouchableOpacity } from "react-native";

import Post from "@src/features/post/screens/post.screen";
import HomeHeader from "./HomeHeader";
import { colors } from "@src/infrastructure/theme/colors";
const Home = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <HomeHeader
        showNotificationModal={() => {
          navigation.navigate("Notification");
        }}
        navigation={navigation}
      ></HomeHeader>

      <View style={styles.postContainer}>
        <Post navigation={navigation}></Post>
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg.primary,
  },
  postContainer: {},
});
