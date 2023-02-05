import { NavigationContainer } from "@react-navigation/native";
import { AppNavigator } from "./app.navigator";
import { AuthNavigator } from "./auth.navigator";
import { AuthenticationContext } from "../../services/authentication/authentication.context";
import { useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Platform, StatusBar } from "react-native";

const Navigator = () => {
  const { isAuthenticated } = useContext(AuthenticationContext);
  return (
    <NavigationContainer>
      {isAuthenticated ? (
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
