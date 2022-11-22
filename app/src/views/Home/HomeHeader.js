import {
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";

import { useSelector } from "react-redux";

import SearchBar from "./SearchBar";
import CreatePost from "../../features/post/CreatePost";
import Color from "../../utils/color";
import readImageData from "../../utils/imageHandler";

const HomeHeader = ({ navigation }) => {
  const user = useSelector((state) => state.auth.user);
  console.log(user);
  const [modalVisible, setModalVisible] = useState(false);
  const [userAvatar, setUserAvatar] = useState("");
  console.log("uservatar", userAvatar);
  const handleNavigationUser = () => {
    navigation.navigate("User");
  };
  const openCreatePostScreen = () => {
    setModalVisible(true);
  };
  useEffect(() => {
    setUserAvatar(readImageData(user.avatar.data.data));
  }, []);
  return (
    <View>
      {/* <SearchBar></SearchBar> */}
      <View style={styles.container}>
        <TouchableOpacity onPress={handleNavigationUser}>
          <Image
            // uri: userAvatar || null,
            source={
              userAvatar == null
                ? {
                    uri: userAvatar,
                  }
                : require("./../../../assets/imgs/DefaultAvatar.png")
            }
            style={styles.avatar}
          ></Image>
        </TouchableOpacity>
        <View style={styles.descriptionContainer}>
          <TouchableOpacity
            onPress={openCreatePostScreen}
            style={styles.description}
          >
            <Text>Bạn đang nghĩ gì...</Text>
          </TouchableOpacity>
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
            <CreatePost
              setIsvisible={setModalVisible}
              style={styles.postCreateContainer}
            ></CreatePost>
          </View>
        </Modal>
      </View>
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
    backgroundColor: Color.descriptionBackground,
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
    marginTop: 22,
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
