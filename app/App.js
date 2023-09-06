import { ThemeProvider } from "styled-components/native";
import { MenuProvider } from "react-native-popup-menu";
import { Provider } from "react-redux";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { I18nextProvider, initReactI18next } from "react-i18next";
import i18next from "i18next";
import { PermissionsAndroid } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import FlashMessage from "react-native-flash-message";

import en from "@src/locales/en.json";
import vi from "@src/locales/vi.json";

import theme from "./src/infrastructure/theme";
import Navigator from "./src/infrastructure/navigation";
import store from "./src/store";

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

export default function App() {
  return (
    <I18nextProvider i18n={i18next}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <BottomSheetModalProvider>
          <MenuProvider>
            <ThemeProvider theme={theme}>
              <Provider store={store}>
                <Navigator />
                <FlashMessage position="top" />
              </Provider>
            </ThemeProvider>
          </MenuProvider>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </I18nextProvider>
  );
}
