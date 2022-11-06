import { StatusBar } from "expo-status-bar";
import { StyleSheet, SafeAreaView, View, Platform } from "react-native";
import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { store } from "./src/features/store";
import LoginScreen from "./src/views/Auth/Login";
import RegisterScreen from "./src/views/Auth/Register";
import Navigation from "./src/components/Navigation";
const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
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
              component={Navigation}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
