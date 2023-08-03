import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, Text, Button, View, TouchableOpacity } from "react-native";

import Post from "@src/features/post/screens/post.screen";
import HomeHeader from "./HomeHeader";
import { colors } from "@src/infrastructure/theme/colors";
import NotificationModal from "./components/NotificationModal.component";
const Home = ({ navigation }) => {
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  return (
    <View style={styles.container}>
      <View>
        <HomeHeader
          showNotificationModal={() => setShowNotificationModal(true)}
          navigation={navigation}
        ></HomeHeader>
      </View>
      <View style={styles.postContainer}>
        <Post navigation={navigation}></Post>
      </View>
      <NotificationModal
        visible={showNotificationModal}
        onClose={() => {
          setShowNotificationModal(false);
        }}
      ></NotificationModal>
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
