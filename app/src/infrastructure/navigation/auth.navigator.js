import { createNativeStackNavigator } from "@react-navigation/native-stack";

import ForgotPassword from "@src/features/auth/screens/ForgotPassword.screen";
import PersonalInfo from "@src/features/auth/screens/PersonalInfo.screen";
import RegisterScreen from "@src/features/auth/screens/Register.screen";
import LoginScreenComponent from "@src/features/auth/screens/SignIn.screen";
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
    <Stack.Screen name="Register" component={RegisterScreen} />
    <Stack.Screen name="Verification" component={Verification} />
    <Stack.Screen name="PersonalInfo" component={PersonalInfo} />
    <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
  </Stack.Navigator>
);
