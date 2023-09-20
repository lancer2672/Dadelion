import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginScreenComponent from "@src/features/auth/screens/SignIn.screen";
import RegisterScreen1 from "@src/features/auth/screens/Register1.screen";
import RegisterScreen2 from "@src/features/auth/screens/Register2.screen";
import Verification from "@src/features/auth/screens/Verification.screen";
const Stack = createNativeStackNavigator();

export const AuthNavigator = () => (
  <Stack.Navigator
    initialRouteName="Login"
    screenOptions={{
      headerShown: false,
    }}
  >
    <Stack.Screen name="Login" component={LoginScreenComponent} />
    <Stack.Screen name="Register1" component={RegisterScreen1} />
    <Stack.Screen name="Register2" component={RegisterScreen2} />
    <Stack.Screen name="Verification" component={Verification} />
  </Stack.Navigator>
);
