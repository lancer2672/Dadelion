import { StatusBar } from "expo-status-bar";
import { StyleSheet, SafeAreaView, View, Platform } from "react-native";
import {
  useFonts as useOswald,
  Oswald_400Regular,
} from "@expo-google-fonts/oswald";
import { useFonts as useLato, Lato_400Regular } from "@expo-google-fonts/lato";

import { ThemeProvider } from "styled-components/native";
import theme from "./src/infrastructure/theme";
import Navigator from "./src/infrastructure/navigation";
import { AuthenticationContextProvider } from "./src/services/authentication/authentication.context";
import { PostContextProvider } from "./src/services/post/post.context";
import { ChatContextProvider } from "./src/services/chat/chat.context";
import { MenuProvider } from "react-native-popup-menu";
import ListUserMessages from "./src/features/chat/components/list-user-messages.component";

export default function App() {
  const [oswaldLoaded] = useOswald({
    Oswald_400Regular,
  });

  const [latoLoaded] = useLato({
    Lato_400Regular,
  });

  if (!oswaldLoaded || !latoLoaded) {
    return null;
  }

  return (
    // library "react-native-popup-menu";
    <MenuProvider>
      <ThemeProvider theme={theme}>
        <AuthenticationContextProvider>
          <PostContextProvider>
            <ChatContextProvider>
              {/* <Navigator></Navigator> */}
              <ListUserMessages></ListUserMessages>
            </ChatContextProvider>
          </PostContextProvider>
        </AuthenticationContextProvider>
      </ThemeProvider>
    </MenuProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
