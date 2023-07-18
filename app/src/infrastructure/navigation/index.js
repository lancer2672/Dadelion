import { NavigationContainer } from "@react-navigation/native";
import { AppNavigator } from "./app.navigator";
import { AuthNavigator } from "./auth.navigator";
import { AuthenticationContext } from "../../services/authentication/authentication.context";
import { useContext, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Platform, StatusBar } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSelector } from "react-redux";
import { userSelector } from "@src/store/selector";

const Navigator = () => {
  const { isAuthenticated } = useContext(AuthenticationContext);
  const userState = useSelector(userSelector);
  console.log("userState", userState);
  // const [createUser, { isLoading, error, data }] = useCreateUserMutation();
  // useEffect(() => {
  //   const getUser = async () => {
  //     const idUser = await AsyncStorage.getItem("idUser");
  //     if (idUser) {
  //       dispatch(userActions.getUser(idUser))
  //         .unwrap()
  //         .then(() => {
  //           setIsLogged(true);
  //         })
  //         .catch(() => {
  //           setIsLogged(false);
  //         });
  //     } else {
  //       setIsLogged(false);
  //     }
  //   };
  //   getUser();
  // }, []);
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
