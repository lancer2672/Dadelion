import {
  Dimensions,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  View,
  ImageBackground,
} from "react-native";
import React, { useState, useEffect } from "react";
import { AntDesign } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useSelector } from "react-redux";

import { setAuth } from "@src/features/auth/authSlice";
import UserPost from "./UserPost";
import { userSelector } from "@src/store/selector";
import { useUpdateUserMutation } from "@src/store/services/userService";
import { isFulfilled } from "@reduxjs/toolkit";
const axios = require("axios").default;
const SCREEN_WIDTH = Dimensions.get("window").width;

const User = ({ props, navigation }) => {
  const { user = {} } = useSelector(userSelector);
  const [updateUser, { isLoading, isSuccess, ...res }] =
    useUpdateUserMutation();
  const [avatarUri, setAvatarUri] = useState(null);
  const [selectedImageUri, setSelectedImageUri] = useState(null);
  const [wallPaperUri, setWallPaperUri] = useState(null);
  useEffect(() => {
    setAvatarUri(user.avatar);
    setWallPaperUri(user.wallPaper);
  }, []);
  useEffect(() => {
    if (isSuccess) {
      setAvatarUri(selectedImageUri);
    }
  }, [isSuccess]);
  const updateUserImage = async (isWallpaper, setUri) => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.cancelled) {
        setSelectedImageUri(result.uri);

        const newUserData = new FormData();
        newUserData.append("userImage", {
          uri: result.uri,
          name: new Date() + "_profile",
          type: "image/jpg",
        });
        newUserData.append("isWallpaper", isWallpaper);
        updateUser({ newUserData, userId: user._id });
      }
    } catch (err) {
      console.log("Error selecting image", err);
    }
  };
  const handleUpdateAvatar = () => updateUserImage(false, setAvatarUri);
  const handleUpdateWallpaper = () => updateUserImage(true, setWallPaperUri);
  const handleLogOut = () => {
    dispatch(setAuth({ isAuthenticated: false, user: null }));
    navigation.navigate("Login");
  };
  return (
    <View style={styles.container}>
      <View>
        {/* wallPaper */}
        <ImageBackground
          source={
            wallPaperUri == null
              ? require("./../../../assets/imgs/DefaultBackground.jpg")
              : { uri: wallPaperUri }
          }
          style={styles.wallPaper}
        >
          {/* avatar */}

          <ImageBackground
            source={
              avatarUri == null
                ? require("@assets/imgs/DefaultAvatar.png")
                : { uri: avatarUri }
            }
            style={styles.avatar}
          >
            <TouchableOpacity onPress={handleUpdateAvatar}>
              <View style={styles.cameraIcon}>
                <AntDesign
                  style={{ opacity: 1 }}
                  name="camera"
                  size={24}
                  color="black"
                />
              </View>
            </TouchableOpacity>
          </ImageBackground>
          <View style={styles.userDescription}>
            <Text>UserName "ICON"</Text>
            <Text>User description "ICON"</Text>
          </View>
          <TouchableOpacity
            onPress={handleUpdateWallpaper}
            style={styles.wallPaperCamera}
          >
            <AntDesign name="camera" size={24} color="black" />
          </TouchableOpacity>
        </ImageBackground>
      </View>
      <TouchableOpacity
        style={{ backgroundColor: "red" }}
        onPress={handleLogOut}
      >
        <Text>Log out</Text>
      </TouchableOpacity>

      {/* user's posts */}

      {/* <View style={styles.userPost}> */}
      <UserPost></UserPost>
      {/* </View> */}
    </View>
  );
};

export default User;

const styles = StyleSheet.create({
  container: {},
  userPost: {
    marginBottom: 400,
  },
  wallPaper: {
    width: SCREEN_WIDTH,
    height: 200,
    justifyContent: "flex-end",
  },
  avatar: {
    marginLeft: 4,
    marginBottom: 4,
    borderWidth: 2,
    borderRadius: 50,
    borderColor: "#555",
    width: 100,
    height: 100,
    position: "absolute",
    bottom: 0,
    left: 0,
    overflow: "hidden",
    justifyContent: "flex-end",
  },
  wallPaperCamera: {
    position: "absolute",
    right: 12,
    bottom: 12,
    padding: 4,
  },
  userDescription: {
    marginLeft: 108,
    marginBottom: 29,
  },
  cameraIcon: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(52, 52, 52, 0.4)",
    paddingBottom: 10,
    opacity: 0.4,
  },
});
