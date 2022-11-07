import { StatusBar } from "expo-status-bar";
import { StyleSheet, SafeAreaView, View, Platform } from "react-native";
import { Provider } from "react-redux";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { store } from "./src/features/store";

import Navigator from "./src/navigation";
export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <Navigator></Navigator>
      </SafeAreaProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
