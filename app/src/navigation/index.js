import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { AppNavigator } from "./app.navigator";
import { AuthNavigator } from "./auth.navigator";
import { AuthenticationContext } from "../services/authentication/authentication.context";
import { useContext } from "react";
const Stack = createNativeStackNavigator();

const Navigator = () => {
  const { isAuthenticated } = useContext(AuthenticationContext);
  console.log("isAuthenticated", isAuthenticated);
  return (
    <NavigationContainer>
      {isAuthenticated ? (
        <AppNavigator></AppNavigator>
      ) : (
        <AuthNavigator></AuthNavigator>
      )}
    </NavigationContainer>
  );
};

export default Navigator;
