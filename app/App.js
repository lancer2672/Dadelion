import { StatusBar } from "expo-status-bar";
import { StyleSheet, SafeAreaView, View, Platform } from "react-native";

import { Provider } from "react-redux";
import { ThemeProvider } from "styled-components/native";
import theme from "./src/infrastructure/theme";
import { store } from "./src/features/store";
import Navigator from "./src/navigation";
import { AuthenticationContextProvider } from "./src/services/authentication/authentication.context";
import { PostContextProvider } from "./src/services/post/post.context";

export default function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <AuthenticationContextProvider>
          <PostContextProvider>
            <Navigator></Navigator>
          </PostContextProvider>
        </AuthenticationContextProvider>
      </ThemeProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
