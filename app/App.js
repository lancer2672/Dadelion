import { ThemeProvider } from "styled-components/native";
import { MenuProvider } from "react-native-popup-menu";
import { Provider } from "react-redux";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { I18nextProvider, initReactI18next } from "react-i18next";
import i18next from "i18next";
import { PermissionsAndroid } from "react-native";
import { useEffect, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import FlashMessage from "react-native-flash-message";

import en from "@src/locales/en.json";
import vi from "@src/locales/vi.json";

import { theme, darkTheme } from "./src/infrastructure/theme";
import Navigator from "./src/infrastructure/navigation";
import store from "./src/store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext } from "react";
import { Voximplant } from "react-native-voximplant";
// import { Voximplant } from "react-native-voximplant";

i18next.use(initReactI18next).init({
  compatibilityJSON: "v3",
  interpolation: { escapeValue: false },
  lng: "vi", // default
  resources: {
    en: { translation: en },
    vi: { translation: vi },
  },
});
PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);

export const ThemeContext = createContext();

export default function App() {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const voximplant = Voximplant.getInstance();
  useEffect(() => {
    // const connectVoximplant = async () => {
    //   let clientState = await voximplant.getClientState();
    //   if (clientState === Voximplant.ClientState.DISCONNECTED) {
    //     await voximplant.connect();
    //     console.log("Disconnected In");
    //   } else if (clientState === Voximplant.ClientState.LOGGED_IN) {
    //     console.log("Logged In");
    //   }
    // };
    // connectVoximplant();
    (async () => {
      const isUseDarkTheme = await AsyncStorage.getItem("AppTheme");
      console.log("darkTheme", isUseDarkTheme);
      if (isUseDarkTheme == "dark") {
        setIsDarkTheme(true);
      }
      const language = await AsyncStorage.getItem("Language");
      console.log("language", language);
      if (language) {
        i18next.changeLanguage(language);
      }
    })();
  }, []);
  return (
    <I18nextProvider i18n={i18next}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <BottomSheetModalProvider>
          <MenuProvider>
            <ThemeProvider theme={isDarkTheme ? darkTheme : theme}>
              <ThemeContext.Provider
                value={{ isDarkTheme: isDarkTheme, setIsDarkTheme }}
              >
                <Provider store={store}>
                  <Navigator />
                  <FlashMessage position="top" />
                </Provider>
              </ThemeContext.Provider>
            </ThemeProvider>
          </MenuProvider>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </I18nextProvider>
  );
}
