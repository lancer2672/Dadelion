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
import { useSelector, useDispatch } from "react-redux";
import { AntDesign } from "@expo/vector-icons";
import * as DocumentPicker from "expo-document-picker";

import { setAuth } from "../../features/auth/authSlice";
import UserPost from "./UserPost";
import { UrlAPI } from "../../constants/constants";

const base64 = require("base-64");
const axios = require("axios").default;
const SCREEN_WIDTH = Dimensions.get("window").width;
const User = ({ navigation }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [imageUri, setImageUri] = useState("");

  const arrayBufferToBase64 = (buffer) => {
    let binary = "";
    let bytes = new Uint8Array(buffer);
    let len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return base64.encode(binary);
  };

  useEffect(() => {
    setImageUri(
      "data:image/jpeg;base64," + arrayBufferToBase64(user.avatar.data.data)
    );
  }, []);

  const handleUpdateAvatar = async () => {
    await DocumentPicker.getDocumentAsync({
      type: "image/*",
    })
      .then((result) => {
        const newUserData = new FormData();
        console.log(result);
        newUserData.append("avatar", result.file);
        console.log(newUserData);
        return (
          axios
            .put(`${UrlAPI}/user/:id`, newUserData, {
              headers: {
                "Content-Type": "multipart/form-data",
              },
              params: {
                id: user._id,
              },
            })
            //set uriImage after calling API using result form documentPicker
            .then((res) => setImageUri(result.uri))
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
      })
      .catch(function (err) {
        console.log("err", err);
      });
  };

  const handleLogOut = () => {
    dispatch(setAuth({ isAuthenticated: false, user: null }));
    navigation.navigate("Login");
  };

  return (
    <View style={{ flex: 1 }}>
      <View>
        {/* wallPaper */}
        <ImageBackground
          source={require("./../../../assets/imgs/24.jpg")}
          style={styles.wallPaper}
        >
          {/* avatar */}
          <ImageBackground
            // source={
            //   imageUri != ""
            //     ? { uri: imageUri }
            //     : require("./../../../assets/imgs/DefaultAvatar.png")
            // }
            source={
              imageUri != ""
                ? { uri: imageUri || null }
                : require("./../../../assets/imgs/DefaultAvatar.png")
            }
            style={styles.avatar}
          >
            <TouchableOpacity onPress={handleUpdateAvatar}>
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "rgba(52, 52, 52, 0.4)",
                  paddingBottom: 10,
                  opacity: 0.4,
                }}
              >
                <AntDesign
                  style={{ opacity: 1 }}
                  name="camera"
                  size={24}
                  color="black"
                />
              </View>
            </TouchableOpacity>
          </ImageBackground>
          <View
            style={{
              marginLeft: 108,
              marginBottom: 25,
            }}
          >
            <Text>UserName "ICON"</Text>
            <Text>User description "ICON"</Text>
          </View>
        </ImageBackground>
      </View>
      <TouchableOpacity
        style={{ backgroundColor: "red" }}
        onPress={handleLogOut}
      >
        <Text>Log out</Text>
      </TouchableOpacity>

      <UserPost style={styles.userPost}></UserPost>
    </View>
  );
};

export default User;

const styles = StyleSheet.create({
  userPost: {
    flex: 1,
    minHeight: 300,
    minWidth: 300,
  },
  wallPaper: {
    width: SCREEN_WIDTH,
    height: 200,
    justifyContent: "flex-end",
  },
  avatar: {
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "#555",
    width: 100,
    height: 100,
    position: "absolute",
    bottom: 0,
    left: 0,
    overflow: "hidden",
    justifyContent: "flex-end",
  },
});
