import { StatusBar } from "expo-status-bar";
import { StyleSheet, SafeAreaView, View, Platform } from "react-native";
import { Provider } from "react-redux";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ThemeProvider } from "styled-components/native";

import theme from "./src/infrastructure/theme";
import { store } from "./src/features/store";
import Navigator from "./src/navigation";
export default function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Navigator></Navigator>
      </ThemeProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
