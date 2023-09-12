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
import { setToken, setUser } from "@src/store/slices/userSlice";
import { setIsLoading } from "@src/store/slices/appSlice";
import { initSocket } from "@src/utils/socket";

const Navigator = () => {
  const userState = useSelector(userSelector);
  const appState = useSelector(appSelector);
  const dispatch = useDispatch();
  const [userCredentials, setCredentials] = useState({});
  const {
    data,
    isSuccess,
    isLoading: isFetching,
    error,
  } = useGetUserByIdQuery(userCredentials.userId, {
    skip: !userCredentials.userId,
  });

  useEffect(() => {
    if (isSuccess && data) {
      dispatch(
        setUser({
          user: data.user,
          token: userCredentials.token,
          refreshToken: userCredentials.refreshToken,
        })
      );
      console.log("user", data.user);
      initSocket(data.user._id);
    }
    dispatch(setIsLoading(isFetching));
  }, [isFetching, data]);

  useEffect(() => {
    const getUser = async () => {
      try {
        const userId = await AsyncStorage.getItem("userId");
        const token = await AsyncStorage.getItem("token");
        const refreshToken = await AsyncStorage.getItem("refreshToken");
        // update token for header RTK query
        dispatch(
          setToken({
            token: JSON.parse(token),
            refreshToken: JSON.parse(refreshToken),
          })
        );
        if (userId) {
          setCredentials({
            userId: JSON.parse(userId),
            token: JSON.parse(token),
            refreshToken: JSON.parse(refreshToken),
          });
        }
      } catch (er) {
        console.log(er);
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
          }}
        >
          <AppNavigator></AppNavigator>
        </SafeAreaView>
      ) : (
        <AuthNavigator></AuthNavigator>
      )}
      {appState.isLoading && (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
          }}
        >
          <ActivityIndicator size="large" color="#FFF" />
        </View>
      )}
    </NavigationContainer>
  );
};

export default Navigator;
