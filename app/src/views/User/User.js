import {
  Dimensions,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  View,
  ImageBackground,
} from "react-native";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { setAuth } from "../../features/auth/authSlice";
import UserPost from "./UserPost";
import { useEffect } from "react";
import { AntDesign } from "@expo/vector-icons";

const axios = require("axios").default;

const SCREEN_WIDTH = Dimensions.get("window").width;
const User = ({ navigation }) => {
  const { user } = useSelector((state) => state.auth);
  const [fileResponse, setFileResponse] = useState([]);
  const dispatch = useDispatch();
  const handleDocumentSelection = async () => {
    try {
      const response = await DocumentPicker.pick({
        presentationStyle: "fullScreen",
      });
      setFileResponse(response);
    } catch (err) {
      console.warn(err);
    }
  };
  const handleLogOut = () => {
    dispatch(setAuth({ isAuthenticated: false, user: null }));
    navigation.navigate("Login");
  };
  console.count("render");
  return (
    <View style={{ flex: 1 }}>
      <View>
        <ImageBackground
          source={require("./../../../assets/imgs/24.jpg")}
          style={{
            width: SCREEN_WIDTH,
            height: 200,
            justifyContent: "flex-end",
          }}
        >
          <ImageBackground
            source={require("./../../../assets/imgs/24.jpg")}
            style={{
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
            }}
          >
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
      <TouchableOpacity onPress={handleLogOut}>
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
});
