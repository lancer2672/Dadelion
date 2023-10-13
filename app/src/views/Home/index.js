import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, Text, Button, View, TouchableOpacity } from "react-native";

import PostList from "@src/features/post/screens/PostList.screen";
import HomeHeader from "./HomeHeader";
import { colors } from "@src/infrastructure/theme/colors";
import { useTheme } from "styled-components";
const Home = ({}) => {
  const theme = useTheme();
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.colors.chat.bg.primary,
      }}
    >
      <HomeHeader></HomeHeader>
      <View style={{ flex: 1 }}>
        <PostList></PostList>
      </View>
    </View>
  );
};

export default Home;
