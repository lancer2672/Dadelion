import {
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState, useContext } from "react";

import { useSelector } from "react-redux";

import CreatePost from "../../features/post/screens/CreatePost";
import Color from "../../utils/color";
import readImageData from "../../utils/imageHandler";
import { AuthenticationContext } from "../../services/authentication/authentication.context";

const HomeHeader = ({ navigation }) => {
  const { user } = useContext(AuthenticationContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [userAvatar, setUserAvatar] = useState("");

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
          {userAvatar == null ? (
            <Image
              style={styles.avatar}
              source={require("./../../../assets/imgs/DefaultAvatar.png")}
            ></Image>
          ) : (
            <Image
              source={{ uri: userAvatar || null }}
              style={styles.avatar}
            ></Image>
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
    backgroundColor: Color.lightGray,
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
