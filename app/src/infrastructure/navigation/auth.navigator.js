import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginScreen from "../../features/auth/screens/login.screen";
import RegisterScreen2 from "../../features/auth/screens/register.screen-phase-2.sceen";
import RegisterScreen1 from "../../features/auth/screens/register-screen-phase-1.screen";
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
