import { ThemeProvider } from "styled-components/native";
import { MenuProvider } from "react-native-popup-menu";
import { Provider } from "react-redux";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { I18nextProvider, initReactI18next } from "react-i18next";
import i18next from "@src/locales/i18n";
import { useEffect, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import FlashMessage from "react-native-flash-message";

import { theme, darkTheme } from "./src/infrastructure/theme";
import Navigator from "./src/infrastructure/navigation";
import store from "./src/store";
import { connectVoximplant } from "@src/voximplant/services/Client";
import { requestNotificationPermission } from "@src/permissions";
import ThemeProviderComponent from "@src/infrastructure/theme/context";

export default function App() {
  useEffect(() => {
    connectVoximplant();
    requestNotificationPermission();
  }, []);
  return (
    <I18nextProvider i18n={i18next}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <BottomSheetModalProvider>
          <MenuProvider>
            <ThemeProviderComponent>
              <Provider store={store}>
                <Navigator />
                <FlashMessage position="top" />
              </Provider>
            </ThemeProviderComponent>
          </MenuProvider>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </I18nextProvider>
  );
}
