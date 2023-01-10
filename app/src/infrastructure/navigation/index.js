import { NavigationContainer } from "@react-navigation/native";
import { AppNavigator } from "./app.navigator";
import { AuthNavigator } from "./auth.navigator";
import { AuthenticationContext } from "../../services/authentication/authentication.context";
import { useContext } from "react";

const Navigator = () => {
  const { isAuthenticated } = useContext(AuthenticationContext);
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
