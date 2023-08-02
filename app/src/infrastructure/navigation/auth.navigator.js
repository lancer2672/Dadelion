import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginScreen from "@src/features/auth/screens/login.screen";
import RegisterScreen1 from "@src/features/auth/screens/Register1.screen";
import RegisterScreen2 from "@src/features/auth/screens/Register2.screen";
const Stack = createNativeStackNavigator();

export const AuthNavigator = () => (
  <Stack.Navigator
    initialRouteName="Login"
    screenOptions={{
      headerShown: false,
    }}
  >
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Register1" component={RegisterScreen1} />
    <Stack.Screen name="Register2" component={RegisterScreen2} />
  </Stack.Navigator>
);
