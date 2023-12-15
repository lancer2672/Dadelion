import { NavigationContainer } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, ActivityIndicator, StatusBar } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";

import { AuthNavigator } from "./auth.navigator";
import { AppNavigator } from "./app.navigator";
import { appSelector, userSelector } from "@src/store/selector";
import { useGetUserByIdQuery } from "@src/store/slices/api/userApiSlice";
import { setUser } from "@src/store/slices/userSlice";
import { setIsLoading } from "@src/store/slices/appSlice";
import { getSocket, initSocket } from "@src/utils/socket";
StatusBar.setBackgroundColor("black");
const Navigator = () => {
  const userState = useSelector(userSelector);
  const appState = useSelector(appSelector);
  const dispatch = useDispatch();
  const [userCredentials, setCredentials] = useState({});
  const socket = getSocket();
  const {
    data,
    isSuccess,
    refetch,
    isLoading: isFetching,
    error,
  } = useGetUserByIdQuery(userCredentials.userId, {
    skip: !userCredentials.userId,
  });
  useEffect(() => {
    //listen to update user friend list
    if (socket) {
      socket.on("unfriend", () => {
        refetch();
      });
      socket.on(
        "response-friendRequest",
        ({ requestId, responseValue, userIds }) => {
          refetch();
        }
      );
    }
  }, [socket]);
  useEffect(() => {
    if (isSuccess && data) {
      dispatch(setUser(data));
      console.log("user", data);
      initSocket(data._id);
    }
    dispatch(setIsLoading(isFetching));
  }, [isFetching, data]);

  useEffect(() => {
    const getUser = async () => {
      try {
        const keys = ["userId", "token", "username"];
        const [userId, token, username] = await Promise.all(
          keys.map((key) => AsyncStorage.getItem(key))
        );
        console.log("userId", userId);
        console.log("token", JSON.parse(token));
        if (userId) {
          setCredentials({
            userId: JSON.parse(userId),
            token: JSON.parse(token),
          });
        }
      } catch (er) {
        console.log("er", er);
      }
    };
    getUser();
  }, []);
  return (
    <NavigationContainer>
      {userState.user ? (
        <SafeAreaView
          style={{
            flex: 1,
            backgroundColor: "red",
          }}
        >
          <StatusBar></StatusBar>
          <AppNavigator></AppNavigator>
        </SafeAreaView>
      ) : (
        <AuthNavigator></AuthNavigator>
      )}
      {appState.isLoading && (
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
          }}
        >
          <ActivityIndicator size="large" color={"rgba(54, 100, 186,0.4)"} />
        </View>
      )}
    </NavigationContainer>
  );
};

export default Navigator;
