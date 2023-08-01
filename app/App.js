import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { StyleSheet, SafeAreaView, View, Platform } from "react-native";
import {
  useFonts as useOswald,
  Oswald_400Regular,
} from "@expo-google-fonts/oswald";
import { useFonts as useLato, Lato_400Regular } from "@expo-google-fonts/lato";

import { ThemeProvider } from "styled-components/native";
import { MenuProvider } from "react-native-popup-menu";
import { Provider } from "react-redux";
import { registerForPushNotificationsAsync } from "@src/notification";
import theme from "./src/infrastructure/theme";
import Navigator from "./src/infrastructure/navigation";
import store from "./src/store";
export default function App() {
  useEffect(() => {
    registerForPushNotificationsAsync();
  }, []);
  return (
    // library "react-native-popup-menu";
    <MenuProvider>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <Navigator></Navigator>
        </Provider>
      </ThemeProvider>
    </MenuProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
