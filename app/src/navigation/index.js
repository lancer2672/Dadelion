import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View } from "react-native";
import styled from "styled-components/native";

import LoginScreen from "../views/Auth/Login";
import RegisterScreen from "../views/Auth/Register";
import MainTabNavigator from "./MainTabNavigator";
const Stack = createNativeStackNavigator();
const t = styled(View)`
  padding: ${(props) => {
    console.log("props", props);
    return 0;
  }};
`;
const Navigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          options={{ headerShown: false }}
          component={LoginScreen}
        />
        <Stack.Screen
          name="Register"
          options={{ headerShown: false }}
          component={RegisterScreen}
        />
        <Stack.Screen
          name="Navigation"
          options={{ headerShown: false }}
          component={MainTabNavigator}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
