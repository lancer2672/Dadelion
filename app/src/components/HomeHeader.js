import {
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
  Text,
  View,
} from "react-native";
import React, { useState } from "react";

import SearchBar from "./SearchBar";
import CreatePost from "../features/post/CreatePost";

const HomeHeader = ({ navigation }) => {
  const [isVisidbleCreatePost, setIsVisidbleCreatePost] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const handleNavigationUser = () => {
    navigation.navigate("User");
  };
  const openCreatePostScreen = () => {
    setModalVisible(true);
  };
  const handleCreatePost = () => {
    setModalVisible(false);
  };
  return (
    <View>
      <SearchBar></SearchBar>
      <View style={styles.container}>
        <TouchableOpacity onPress={handleNavigationUser}>
          <Image
            source={require("./../../assets/imgs/24.jpg")}
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
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <CreatePost
              setIsvisible={setModalVisible}
              style={styles.postCreateContainer}
            ></CreatePost>
            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={handleCreatePost}
            >
              <Text style={styles.textStyle}>Hide Modal</Text>
            </TouchableOpacity>
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
    backgroundColor: "#b8b5b0",
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
