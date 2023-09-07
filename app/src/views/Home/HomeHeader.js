import {
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState, useContext } from "react";
import { FontAwesome5, Feather, Entypo } from "@expo/vector-icons";

import CreatePost from "@src/features/post/screens/CreatePost.screen";
import { useSelector } from "react-redux";
import { userSelector } from "@src/store/selector";
import { colors } from "@src/infrastructure/theme/colors";
import { Spacer } from "@src/components/spacer/spacer.component";
import { useTheme } from "styled-components";

const HomeHeader = ({ navigation, showNotificationModal }) => {
  const userState = useSelector(userSelector);
  const { user } = userState;
  const theme = useTheme();
  const [modalVisible, setModalVisible] = useState(false);
  const handleNavigationUser = () => {
    navigation.navigate("User");
  };
  const openCreatePostScreen = () => {
    setModalVisible(true);
  };
  const navigateToSearchScreen = () => {
    navigation.navigate("Search");
  };
  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          marginTop: 12,
          marginHorizontal: 24,
          alignItems: "center",
        }}
      >
        <Text
          style={{
            flex: 1,
            fontSize: 22,
            fontWeight: 500,
            color: theme.colors.chat.text,
          }}
        >
          Dandelions
        </Text>

        <TouchableOpacity
          onPress={navigateToSearchScreen}
          style={{
            backgroundColor: colors.white,
            padding: 8,
            borderRadius: 25,
            elevation: 2,
          }}
        >
          <Feather name="search" size={20} color={colors.black} />
        </TouchableOpacity>

        <Spacer position={"left"} size={"large"}></Spacer>

        <TouchableOpacity
          onPress={showNotificationModal}
          style={{
            backgroundColor: colors.white,
            minWidth: 38,
            padding: 6,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 25,
            elevation: 2,
          }}
        >
          <FontAwesome5 name="bell" size={22} color={colors.black} />
          <Entypo
            style={{ position: "absolute", top: -13, right: -2 }}
            name="dot-single"
            size={40}
            color="red"
          />
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <TouchableOpacity onPress={handleNavigationUser}>
          {user.avatar == null ? (
            <Image
              style={styles.avatar}
              source={require("./../../../assets/imgs/DefaultAvatar.png")}
            ></Image>
          ) : (
            <Image source={{ uri: user.avatar }} style={styles.avatar}></Image>
          )}
        </TouchableOpacity>
        <View style={styles.descriptionContainer}>
          <TouchableOpacity
            onPress={openCreatePostScreen}
            style={styles.description}
          >
            <Text>Bạn đang nghĩ gì...</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <CreatePost setIsvisible={setModalVisible}></CreatePost>
        </View>
      </Modal>
      {/* <CreatePostModal isVisible={isVisidbleCreatePost}></CreatePostModal> */}
    </View>
  );
};

export default HomeHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    margin: 12,
    alignItems: "center",
  },
  descriptionContainer: {
    position: "absolute",
    flex: 1,
    right: 0,
    left: 48,
  },
  description: {
    backgroundColor: "gray",
    opacity: 0.5,
    padding: 8,
    borderRadius: 25,
  },

  avatar: {
    width: 40,
    height: 40,
    resizeMode: "stretch",
    borderRadius: 50,
    marginRight: 8,
  },

  //Modal
  postCreateContainer: {},
  centeredView: {
    backgroundColor: "rgba(1, 1, 1, 0.2)",
    flex: 1,
    alignItems: "center",
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
});
