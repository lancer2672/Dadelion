import { NavigationContainer } from "@react-navigation/native";
import { AppNavigator } from "./app.navigator";
import { AuthNavigator } from "./auth.navigator";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Platform, StatusBar } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import { userSelector } from "@src/store/selector";
import { useGetUserByIdQuery } from "@src/store/services/userService";
import { loggout, setToken, setUser } from "@src/store/slices/userSlice";

const Navigator = () => {
  const userState = useSelector(userSelector);
  const dispatch = useDispatch();
  const [userCredentials, setCredentials] = useState({});
  const { data, isLoading, isSuccess, error } = useGetUserByIdQuery(
    userCredentials.userId,
    {}
  );
  useEffect(() => {
    //get user succeeded
    if (isSuccess && data) {
      dispatch(setUser({ user: data, token: userCredentials.token }));
    }
    dispatch(loggout());
  }, [isSuccess, data]);
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
            paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
          }}
        >
          <AppNavigator></AppNavigator>
        </SafeAreaView>
      ) : (
        <AuthNavigator></AuthNavigator>
      )}
    </NavigationContainer>
  );
};

export default Navigator;
