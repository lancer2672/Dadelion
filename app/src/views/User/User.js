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

import { setAuth } from "../../features/auth/authSlice";
import UserPost from "./UserPost";
import { UrlAPI } from "../../constants";
import readImageData from "../../utils/imageHandler";
import { AuthenticationContext } from "../../services/authentication/authentication.context";
import { useContext } from "react";

const axios = require("axios").default;
const SCREEN_WIDTH = Dimensions.get("window").width;

const User = ({ ...props }) => {
  const { navigation } = props;
  const { user } = useContext(AuthenticationContext);
  const [avatarUri, setAvatarUri] = useState("");
  const [wallPaperUri, setWallPaperUri] = useState("");
  useEffect(() => {
    setAvatarUri(readImageData(user.avatar.data.data));
    setWallPaperUri(readImageData(user.wallPaper.data.data));
  }, []);
  console.log(user._id);
  const updateUserImage = async (isWallpaper, setUri) => {
    await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })
      .then((result) => {
        if (!result.cancelled) {
          const newUserData = new FormData();
          newUserData.append("userImage", {
            uri: result.uri,
            name: new Date() + "_profile",
            type: "image/jpg",
          });
          newUserData.append("isWallpaper", isWallpaper);
          console.log("selected");
          return (
            axios
              .put(`${UrlAPI}/user/${user._id}`, newUserData, {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              })
              //set uriImage after calling API using result form documentPicker
              .then((res) => {
                setUri(result.uri);
                console.log(res);
              })
              .catch(function (error) {
                console.log("err");
                if (error.response) {
                  // The request was made and the server responded with a status code
                  // that falls out of the range of 2xx
                  console.log(error.response.data);
                  console.log(error.response.status);
                  console.log(error.response.headers);
                } else if (error.request) {
                  // The request was made but no response was received
                  // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                  // http.ClientRequest in node.js
                  console.log(error.request);
                } else {
                  // Something happened in setting up the request that triggered an Error
                  console.log("Error", error.message);
                }
                console.log(error.config);
              })
          );
        }
      })
      .catch(function (err) {
        console.log("err", err);
      });
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
          //   source={
          //     {wallPaperUri == null? {uri: wallPaperUri}: require("./../../../assets/imgs/24.jpg")}

          // }
          source={
            wallPaperUri == null
              ? require("./../../../assets/imgs/24.jpg")
              : { uri: wallPaperUri || null }
          }
          style={styles.wallPaper}
        >
          {/* avatar */}

          <ImageBackground
            source={
              avatarUri == null
                ? require("./../../../assets/imgs/DefaultAvatar.png")
                : { uri: avatarUri || null }
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
