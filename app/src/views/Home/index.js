import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, Text, Button, View, TouchableOpacity } from "react-native";

import Post from "@src/features/post/screens/post.screen";
import HomeHeader from "./HomeHeader";
import { colors } from "@src/infrastructure/theme/colors";
import { useTheme } from "styled-components";
const Home = ({ navigation }) => {
  const theme = useTheme();
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.colors.chat.bg.primary,
      }}
    >
      <HomeHeader
        showNotificationModal={() => {
          navigation.navigate("Notification");
        }}
        navigation={navigation}
      ></HomeHeader>

      <View>
        <Post navigation={navigation}></Post>
      </View>
    </View>
  );
};

export default Home;
